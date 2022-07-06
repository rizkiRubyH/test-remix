import { createCookieSessionStorage, redirect } from "@remix-run/node";

export interface LoginForm {
  username: string
  password: string
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: ["secret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const userName = session.get("userName");
  if (!userName || typeof userName !== "string") return null;
  return session;
}

export async function login({ username, password }: LoginForm) {
  if (username !== "admin") return null;
  if (password !== "a") return null;
  return { username };
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userName: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userName", userName);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}