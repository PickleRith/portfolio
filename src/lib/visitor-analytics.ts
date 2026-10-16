import { isIP } from "node:net";
import { neon } from "@neondatabase/serverless";

const RETENTION_DAYS = 30;

export type Visit = {
	id: number;
	visited_at: Date | string;
	ip_address: string | null;
	country: string | null;
	region: string | null;
	city: string | null;
	page_path: string;
	referrer_host: string | null;
	browser: string;
	device: string;
};

function database() {
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error("DATABASE_URL is not configured");
	return neon(url);
}

let schemaReady: Promise<void> | undefined;

function ensureSchema() {
	if (!schemaReady) {
		schemaReady = (async () => {
			const sql = database();
			await sql`
				CREATE TABLE IF NOT EXISTS portfolio_visits (
					id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
					visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
					ip_address VARCHAR(45),
					country VARCHAR(2),
					region VARCHAR(80),
					city VARCHAR(120),
					page_path VARCHAR(200) NOT NULL,
					referrer_host VARCHAR(200),
					browser VARCHAR(30) NOT NULL,
					device VARCHAR(20) NOT NULL
				)
			`;
			await sql`CREATE INDEX IF NOT EXISTS portfolio_visits_visited_at_idx ON portfolio_visits (visited_at DESC)`;
		})();
		schemaReady.catch(() => {
			schemaReady = undefined;
		});
	}
	return schemaReady;
}

function limited(value: string | null, max: number) {
	return value?.trim().slice(0, max) || null;
}

function cityFromHeader(raw: string | null) {
	if (!raw) return null;
	try {
		return limited(decodeURIComponent(raw), 120);
	} catch {
		return limited(raw, 120);
	}
}

function referrerHost(raw: string | null, currentHost: string) {
	if (!raw) return null;
	try {
		const url = new URL(raw);
		if (
			!["http:", "https:"].includes(url.protocol) ||
			url.host === currentHost
		)
			return null;
		return limited(url.hostname, 200);
	} catch {
		return null;
	}
}

function browserAndDevice(agent: string) {
	const browser = /Edg\//.test(agent)
		? "Edge"
		: /Firefox\//.test(agent)
			? "Firefox"
			: /Chrome\//.test(agent)
				? "Chrome"
				: /Safari\//.test(agent)
					? "Safari"
					: "Other";
	const device = /bot|crawler|spider|slurp|preview/i.test(agent)
		? "Bot"
		: /tablet|ipad/i.test(agent)
			? "Tablet"
			: /mobi|iphone|android/i.test(agent)
				? "Mobile"
				: "Desktop";
	return { browser, device };
}

export function visitFromRequest(request: Request) {
	const headers = request.headers;
	const agent = headers.get("user-agent") || "";
	const { browser, device } = browserAndDevice(agent);
	const forwarded = process.env.VERCEL
		? headers.get("x-vercel-forwarded-for") ||
			headers.get("x-forwarded-for")
		: null;
	const candidate = forwarded?.split(",")[0]?.trim() || "";
	const ip = isIP(candidate) ? candidate : null;
	const url = new URL(request.url);
	return {
		ip,
		country: limited(headers.get("x-vercel-ip-country"), 2),
		region: limited(headers.get("x-vercel-ip-country-region"), 80),
		city: cityFromHeader(headers.get("x-vercel-ip-city")),
		pagePath: limited(url.searchParams.get("page"), 200) || "/",
		referrer: referrerHost(
			headers.get("x-entry-referrer") || headers.get("referer"),
			url.host,
		),
		browser,
		device,
	};
}

export async function recordVisit(request: Request) {
	await ensureSchema();
	const visit = visitFromRequest(request);
	if (visit.device === "Bot") return;
	const sql = database();
	await sql`
		INSERT INTO portfolio_visits
			(ip_address, country, region, city, page_path, referrer_host, browser, device)
		VALUES
			(${visit.ip}, ${visit.country}, ${visit.region}, ${visit.city}, ${visit.pagePath},
			 ${visit.referrer}, ${visit.browser}, ${visit.device})
	`;
	// Runs on each visit so records expire even if the admin never opens the dashboard.
	await sql`DELETE FROM portfolio_visits WHERE visited_at < NOW() - INTERVAL '30 days'`;
}

export async function getDashboardData() {
	await ensureSchema();
	const sql = database();
	await sql`DELETE FROM portfolio_visits WHERE visited_at < NOW() - INTERVAL '30 days'`;
	const [counts, countries, visits] = await Promise.all([
		sql`
			SELECT COUNT(*)::int AS total,
				COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '7 days')::int AS week,
				COUNT(DISTINCT ip_address)::int AS unique_ips
			FROM portfolio_visits
		`,
		sql`
			SELECT COALESCE(country, 'Unknown') AS country, COUNT(*)::int AS visits
			FROM portfolio_visits GROUP BY country ORDER BY visits DESC LIMIT 8
		`,
		sql`
			SELECT id, visited_at, ip_address, country, region, city, page_path,
				referrer_host, browser, device
			FROM portfolio_visits ORDER BY visited_at DESC LIMIT 100
		`,
	]);
	return {
		retentionDays: RETENTION_DAYS,
		counts: counts[0] as {
			total: number;
			week: number;
			unique_ips: number;
		},
		countries: countries as { country: string; visits: number }[],
		visits: visits as Visit[],
	};
}
