/**
 * Lista de paginas publicas
 * não necessita autenticação
 * @type {string[]}
 */
export const publicRoutes = [
    '/'
];

/**
 * Lista de paginas usadas para autenticação
 * essas rotas redirecionam para /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error'
];

/**
 * Prefix para api de rotas para autenticação
 * Rotas iniciadas com esse prefix são usadas pela autenticação
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Redirect padrão após login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'