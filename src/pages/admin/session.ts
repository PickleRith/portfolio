import type { APIRoute } from "astro";
import {
	COOKIE_NAME,
	createSession,
	passwordMatches,
	privateHeaders,
	sameOrigin,
} from "@/lib/admin-auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	if (!sameOrigin(request))
		return new Response(null, { status: 403, headers: privateHeaders });
	const data = await request.formData();
	const input = data.get("password");
	let valid = false;
	try {
		valid =
			typeof input === "string" &&
			input.length <= 1024 &&
			passwordMatches(input);
	} catch (error) {
		console.error("Admin authentication is not configured", error);
	}
	if (!valid) {
		const response = redirect("/admin/login?error=1", 303);
		Object.entries(privateHeaders).forEach(([name, value]) =>
			response.headers.set(name, value),
		);
		return response;
	}
	cookies.set(COOKIE_NAME, createSession(), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/admin",
		maxAge: 12 * 60 * 60,
	});
	const response = redirect("/admin", 303);
	Object.entries(privateHeaders).forEach(([name, value]) =>
		response.headers.set(name, value),
	);
	return response;
};
