import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useActionData, Form } from "@remix-run/react";
import { createUserSession, login } from "~/sessions";

export async function action({ request } : any) {
  const body = await request.formData();
  const name = body.get("username");
  const pass = body.get("password");

  const user = await login({ username : name, password : pass });
  if (!user) {
    return json({ message: "wrong username or password" });
  }
  return createUserSession(user.username, "/");
}


export default function Invoices() {
  const data = useActionData();

  return (
    <>
      <div className="bg-slate-400 min-h-screen w-full flex items-center justify-center">
        <Form method="post" onSubmit={() => console.log("submit")}>
          <p>Login</p>
          <div className="border-2 border-black p-5">
            <p className="mb-2">
              <label className="flex flex-col">
                <span>UserName :</span>
                <input type="text" name="username" className="px-2 py-1 rounded"/>
              </label>
            </p>
            <p>
              <label className="flex flex-col">
                <span>password :</span>
                <input type="password" name="password" className="px-2 py-1 rounded"/>
              </label>
            </p>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
          <p className="text-red-700">{data?.message ?? null}</p>
        </Form>
      </div>
    </>
  );
}