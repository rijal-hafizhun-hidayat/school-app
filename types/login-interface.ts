export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginFetch {
  success: boolean;
  data: Token;
}

export interface Token {
  token: string;
}
