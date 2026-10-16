import type { APIRoute } from "astro";
import { recordVisit } from "@/lib/visitor-analytics";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const origin = request.headers.get("origin");
	const site = new URL(request.url);
	if (!origin || origin !== site.origin) {
		return new Response(null, { status: 403 });
	}
	try {
		await recordVisit(request);
		return new Response(null, {
			status: 204,
			headers: { "Cache-Control": "no-store" },
		});
	} catch (error) {
		console.error("Visitor analytics write failed", error);
		return new Response(null, {
			status: 503,
			headers: { "Cache-Control": "no-store" },
		});
	}
};
