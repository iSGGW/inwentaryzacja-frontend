import type { authResponse, sessionInfo, user } from "src/App/Entities";

export function sessionData(): sessionInfo | void {
  const data = localStorage.getItem("isggw-user");
  if (data) return JSON.parse(data);
}

export async function login(props: user): Promise<sessionInfo> {
  const { usernameOrEmail, password } = props;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernameOrEmail, password }),
  };

  const response = await fetch(`/api/auth/signin`, requestOptions);

  const text = await response.text();
  const data: authResponse = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data);
  }

  const userInfo: sessionInfo = {
    user: usernameOrEmail,
    token: data.accessToken,
    role: data.tokenBearerRole,
  };

  localStorage.setItem("isggw-user", JSON.stringify(userInfo));
  return {
    token: data.accessToken,
    user: usernameOrEmail,
    role: data.tokenBearerRole,
  };
}

export function logout() {
  localStorage.removeItem("isggw-user");
  location.reload();
}
