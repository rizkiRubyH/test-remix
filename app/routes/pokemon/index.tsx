import { memo } from "react";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPokemons } from "../api"
import { getUser } from "~/sessions";

// components
import { Layout } from "~/components/layout";

// types
import type { LoaderFunction } from "@remix-run/server-runtime";

export const loader : LoaderFunction = async ({request}) => {
  const session = await getUser(request);
  if (!session) {
    return redirect("/login")
  }
  const userName = session?.data?.userName
  return json({
    pokemons: await getPokemons(),
    user: {userName, session}
  });
};

const Pokemons = memo(() => {
  const { pokemons, user } = useLoaderData()

  return (
    <Layout userLogin={user}>
      <main className="mx-auto max-w-4xl">
        <h1 className="my-6 border-b-2 text-center text-3xl">
          Which Pokémon do you want to catch?</h1>
        <ul className='mx-auto text-center'>
          {pokemons.map((pokemon: any) => (
            <li key={pokemon.name}>
              <Link
                to={`${pokemon.name}`}
                className="text-blue-600 underline"
              >
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
})

export default Pokemons
