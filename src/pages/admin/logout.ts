import type { APIRoute } from "astro";
import { COOKIE_NAME, privateHeaders, sameOrigin } from "@/lib/admin-auth";

export const prerender = false;

export const POST: APIRoute = ({ request, cookies, redirect }) => {
	if (!sameOrigin(request))
		return new Response(null, { status: 403, headers: privateHeaders });
	cookies.delete(COOKIE_NAME, { path: "/admin" });
	const response = redirect("/admin/login", 303);
	Object.entries(privateHeaders).forEach(([name, value]) =>
		response.headers.set(name, value),
	);
	return response;
};
