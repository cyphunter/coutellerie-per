import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Catch-all Better-Auth — gère /api/auth/sign-in, /sign-up, /sign-out,
 * /get-session, /verify-email, /reset-password, etc.
 */
export const { GET, POST } = toNextJsHandler(auth);
