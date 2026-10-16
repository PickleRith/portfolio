import type { APIRoute } from "astro";
import { sameOrigin } from "@/lib/admin-auth";
import { updateVisitDuration } from "@/lib/visitor-analytics";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	if (!sameOrigin(request)) return new Response(null, { status: 403 });
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response(null, { status: 400 });
	}
	if (!body || typeof body !== "object")
		return new Response(null, { status: 400 });
	const { token, visibleMs } = body as Record<string, unknown>;
	if (typeof token !== "string" || typeof visibleMs !== "number") {
		return new Response(null, { status: 400 });
	}
	try {
		await updateVisitDuration(token, visibleMs);
		return new Response(null, {
			status: 204,
			headers: { "Cache-Control": "no-store" },
		});
	} catch (error) {
		if (error instanceof Error && error.message.startsWith("Invalid")) {
			return new Response(null, { status: 400 });
		}
		console.error("Visitor duration write failed", error);
		return new Response(null, { status: 503 });
	}
};
