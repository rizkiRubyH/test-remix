import { memo } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCharacters } from "../api/character"

export const loader = async () => {
  return json({
    characters: await getCharacters(),
  });
};

const RicknMorty = memo(() => {
  const { characters } = useLoaderData()

  return (
    <main className="mx-auto bg-teal-900">
      <div className='grid grid-cols-2 gap-2 p-5'>
        {characters.map((character: any) => (
          <div key={character?.id} className="flex mb-2 border">
            <img src={character?.image} alt={character?.name} className="w-48 h-48" />
            <div className="flex flex-col justify-center ml-10">
              <p className="text-white text-4xl">{character?.name}</p>
              <div className="flex mt-10 text-2xl">
                <p className="mr-5">{character?.species}</p>
                <p className={character?.status === "Alive" ? "text-green-400" : "text-red-400"}>
                  {character?.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
})

export default RicknMorty
