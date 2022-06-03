import { Session } from 'remix';

/**
 * Base session manager type for authentication requests.
 */
export type AuthSession = {
  /**
   * Returns the current user session object
   * @param {Request} request the resource request
   * @param {"cookie"|"file"} sessionType the session storage type used
   * @returns {Promise<Session>} Promise object that resolves a Session
   */
  getAuthSession(request: Request, sessionType?: "cookie"|"file"): Promise<Session>;
  /**
   * Creates the user session for authentication.
   * @param {object} data the object that represents the user data
   * @param {string} redirectTo the location to redirect to on success
   * @param {"cookie"|"file"} sessionType the session storage type used
   * @returns {Promise<Response>} Promise object that resolves a Response
   */
  createAuthSession(data: any, redirectTo?: string, sessionType?: "cookie"|"file"): Promise<Response>;
  /**
   * Destroys or otherwise invalidates the user session.
   * @param {Request} request the resource request
   * @param {strin[] | string} keys the session keys to invalidate
   * @param {string} redirectTo the location to redirect to on success
   * @param {"cookie"|"file"} sessionType the session storage type used
   * @returns {Promise<Response>} Promise object that resolves a Response
   */
  destroyAuthSession(request: Request, keys: string[] | string, redirectTo?: string, sessionType?: "cookie"|"file"): Promise<Response>;
};

/**
 * Base user type for use with AuthInterface implementers.
 * May be extended to support additional properties.
 */
export type AuthUser = {
  /**
   * Unique identifier for a user
   */
  id?: any;
  /**
   * Unique name assigned to a user (typically an email)
   */
  username?: any;
  /**
   * User's password; for sign in and account creation
   */
  password?: any;
  /**
   * Display name for the user
   */
  name?: string;
  /**
   * Assigned role for the user account
   */
  role?: any;
};

/**
 * Auth interface for implementers to adhere to. Implementations are free
 * to determine what types to return, typically a Promise<Response> is
 * appropriate.
 */
export interface Auth<User extends AuthUser> {
  /**
   * Creates a new user account
   * @param {User} user the user account details
   * @param {string} redirectTo the location to redirect to on success
   * @returns {any} Typically a Promise object that resolves a Response
   */
  createAccount(user: User, redirectTo?: string): Promise<Response>;
  /**
   * Login in a user.
   * @param {User} user the user account details
   * @param {string} redirectTo the location to redirect to on success
   * @returns {any} Typically a Promise object that resolves a Response
   */
  login(user: User, redirectTo?: string): Promise<Response>;
  /**
   * Logout a user.
   * @param {Request} request the resource request
   * @param {string} redirectTo the location to redirect to on success
   * @returns {any} Typically a Promise object that resolves a Response
   */
  logout(request: Request, redirectTo?: string): Promise<Response>;
  /**
   * Determines if a user account already exists.
   * @param {User} user the user account details
   * @returns {boolean | Promise<boolean>} true if the user exists, false otherwise
   */
  exists(user: User): boolean | Promise<boolean>;
  /**
   * Ensures that a user is signed in and optionally that the user holds
   * the necessary role for access to a resource.
   * @param {Request} request the resource request
   * @param {string | null} role the role assigned to the user (pass null for any)
   * @param {string} redirectTo where to redirect the user if the requirement fails
   * @returns {any} Typically a Promise object that resolves a Response
   */
  requireUser(request: Request, role?: string | null, redirectTo?: string): Promise<Response>;
  /**
   * Returns the currently authenticated user details
   * @param {Request} request the resource request
   * @returns {any} Return or resolve an AuthUserType object or null
   */
  user(request: Request): Promise<User | null>;
}
