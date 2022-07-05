import { json } from "@remix-run/node";
import { getCharacters } from "./character"
import { getPokemons } from "./pokemon"

export const loader = async () => {
  return json({
    characters: await getCharacters(),
    pokemons: await getPokemons()
  });
};

