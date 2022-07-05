import { memo } from "react";
import { Link } from "@remix-run/react";

const Main = memo(() => {
  const testFetch = [
    {title: "pokemon"},
    {title: "character"}
  ]

  return (
    <main className="mx-auto max-w-4xl">
      <ul className='mx-auto text-center'>
        {testFetch.map((test: any) => (
          <li key={test.title}>
            <Link
              to={test.title}
              className="text-blue-600 underline"
            >
              {test.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
})

export default Main