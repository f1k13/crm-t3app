const TOKEN_KEY = "token";

export const setCookie = (token: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${TOKEN_KEY}=${token}; path=/; expires=${expires}; SameSite=Lax`;
};

export const getCookie = (): string | null => {
  const value = RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`).exec(document.cookie);
  return value ? decodeURIComponent(value[1] ?? "") : null;
};

export const deleteCookie = () => {
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
