import { memo } from "react";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/sessions";

// components
import { Layout } from "~/components/layout";

// types
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUser(request);
  if (!session) {
    return redirect("/login")
  }
  const userName = session?.data?.userName
  return json({userName, session});
};

const Main = memo(() => {
  const data = useLoaderData()

  const testData = [
    {title: "Pokemon", image: "https://i.imgur.com/s1YRcpu.png", url: "pokemon"},
    {title: "Rick n Morty", image: "https://i.imgur.com/kkE25w2.jpeg", url: "ricknmorty"}
  ]

  return (
    <>
      <Layout userLogin={data}>
        <main className="mx-auto max-w-4xl flex items-center justify-center min-h-screen w-full">
          <div className='mx-auto text-center flex justify-around w-full'>
            {testData.map((test: any) => (
              <div key={test.title} className="hover:scale-110 transition duration-200 ease-in-out">
                <Link to={test.url}>
                  <img src={test.image} alt={test.title} className="w-96 h-96" />
                  <p className="text-zinc-500 text-2xl">{test.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
})

export default Main