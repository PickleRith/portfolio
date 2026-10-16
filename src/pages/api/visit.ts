import type { APIRoute } from "astro";
import { sameOrigin } from "@/lib/admin-auth";
import { recordVisit } from "@/lib/visitor-analytics";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	if (!sameOrigin(request)) {
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
