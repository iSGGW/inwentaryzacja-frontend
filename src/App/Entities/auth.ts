export interface user {
  usernameOrEmail: string;
  password: string;
}

export const userInitialValues: user = {
  usernameOrEmail: "",
  password: "",
};

export interface authResponse {
  accessToken: string;
  tokenType: string;
}

export type sessionInfo = {
  token: string;
  user: string;
};
