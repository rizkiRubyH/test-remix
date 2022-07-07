import type {LoaderFunction } from "@remix-run/node";
import { logout } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  return logout(request);
};