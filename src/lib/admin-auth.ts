import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "portfolio_admin";
const SESSION_SECONDS = 12 * 60 * 60;

function secrets() {
	const password = process.env.ADMIN_PASSWORD;
	const key = process.env.ADMIN_SESSION_SECRET;
	if (!password || password.length < 16 || !key || key.length < 32) {
		throw new Error(
			"ADMIN_PASSWORD must be at least 16 characters and ADMIN_SESSION_SECRET at least 32",
		);
	}
	return { password, key };
}

export function passwordMatches(input: string) {
	const { password } = secrets();
	const left = createHmac("sha256", "portfolio-password")
		.update(input)
		.digest();
	const right = createHmac("sha256", "portfolio-password")
		.update(password)
		.digest();
	return timingSafeEqual(left, right);
}

function signature(payload: string, key: string) {
	return createHmac("sha256", key).update(payload).digest("hex");
}

export function createSession() {
	const { key } = secrets();
	const expiry = Date.now() + SESSION_SECONDS * 1000;
	const payload = String(expiry);
	return `${payload}.${signature(payload, key)}`;
}

export function validSession(value: string | undefined) {
	if (!value) return false;
	const [payload, supplied, extra] = value.split(".");
	if (extra || !payload || !supplied || !/^\d{13}$/.test(payload))
		return false;
	if (Number(payload) < Date.now()) return false;
	try {
		const { key } = secrets();
		const expected = Buffer.from(signature(payload, key), "hex");
		const received = Buffer.from(supplied, "hex");
		return (
			received.length === expected.length &&
			timingSafeEqual(received, expected)
		);
	} catch {
		return false;
	}
}

export function sameOrigin(request: Request) {
	const origin = request.headers.get("origin");
	if (!origin) return false;
	try {
		const supplied = new URL(origin).origin;
		const accepted = [new URL(request.url).origin];
		if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
			accepted.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
		}
		return accepted.includes(supplied);
	} catch {
		return false;
	}
}

export const privateHeaders = {
	"Cache-Control": "private, no-store, max-age=0",
	"X-Robots-Tag": "noindex, nofollow",
};
