export async function getCharacters() {
  const res = await fetch(
    "https://rickandmortyapi.com/api/character"
  ).then((res) => res.json());

  return res.results;
}