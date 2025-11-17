// Configuração da API para comunicação com o back-end

const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  ENDPOINTS: {
    // Autenticação
    LOGIN: process.env.NEXT_PUBLIC_AUTH_LOGIN_URL || "/auth/login",
    REGISTER: process.env.NEXT_PUBLIC_AUTH_REGISTER_URL || "/auth/register",
    FORGOT_PASSWORD: process.env.NEXT_PUBLIC_AUTH_FORGOT_PASSWORD_URL || "/auth/forgot-password",
    RESET_PASSWORD: process.env.NEXT_PUBLIC_AUTH_RESET_PASSWORD_URL || "/auth/reset-password",

    // Autenticação social
    GOOGLE_AUTH: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || "/auth/google",
    GITHUB_AUTH: process.env.NEXT_PUBLIC_GITHUB_AUTH_URL || "/auth/github",

    // Perfil do usuário
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
  },

  // Headers padrão
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Timeout para requisições
  TIMEOUT: 10000, // 10 segundos
};

// Função helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Função helper para headers com autenticação
export const getAuthHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = { ...API_CONFIG.DEFAULT_HEADERS };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Função helper para fazer requisições à API
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = buildApiUrl(endpoint);

  const defaultOptions: RequestInit = {
    headers: API_CONFIG.DEFAULT_HEADERS,
    signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  return fetch(url, mergedOptions);
};

export default API_CONFIG;
