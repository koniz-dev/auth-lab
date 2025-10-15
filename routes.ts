/**
 * Public routes that can be accessed without authentication
 * 
 * Users can visit these routes without being logged in
 * 
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * Protected routes that require user authentication
 * 
 * Unauthenticated users will be redirected to /settings
 * 
 * @type {string[]}
 */
export const protectedRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * API authentication route prefix
 * 
 * All routes beginning with this prefix handle API authentication functionality
 * 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after login
 * 
 * Unauthenticated users will be redirected to this path after logging in
 * 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
