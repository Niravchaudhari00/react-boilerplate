export type CookieOptions = {
  path?: string;
  expires?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  key?: string;
  value?: any;
  sameSite?: boolean | "lax" | "strict" | "none";
};
