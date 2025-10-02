export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts?.length === 2) return parts.pop()?.split(";").shift() || null;
  else return null;
};

export const setCookie = (
  name: string,
  value: string,
  options: { path?: string; expires: Date }
) => {
  let cookie = `${name}=${value} ; path=${options.path || "/"}`;
  if (options?.expires) {
    cookie += `; expires${options?.expires?.toUTCString()}`;
  }
  document.cookie = cookie;
};
export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};
