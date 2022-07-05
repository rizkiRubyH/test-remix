import { memo } from "react";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPokemons } from "../api/pokemon"

export const loader = async () => {
  return json({
    pokemons: await getPokemons(),
  });
};

const Pokemons = memo(() => {
  const { pokemons } = useLoaderData()

  return (
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
  );
})

export default Pokemons
