import { memo } from "react"
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

//components
import { getPokemon } from "../api/pokemon";

// types
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({params,}) => {
  return json({
    pokemon: await getPokemon(params.id as string),
  });
};

const PostSlug = memo(() => {
  const { pokemon } = useLoaderData();
  console.log(pokemon)
  return (
    <main className="mx-auto max-w-4xl">
      <img className='mx-auto' src={pokemon?.sprites?.front_default} alt={pokemon.name}  />
    </main>
  );
})

export default PostSlug