/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {"USER" | "ADMIN"} [role]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token
 * @property {User} [user]
 * @property {string} [refreshToken]
 * @property {number} [expiresIn]
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */
