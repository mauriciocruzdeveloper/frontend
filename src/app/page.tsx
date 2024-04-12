import Link from "next/link";
import interfaces from "@/interfaces/interfaces.json";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <ul>
        {Object.keys(interfaces).map((key, index) => (
          <li>
            <Link key={index} href={`/dashboard/${key.toLowerCase()}s`}>
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
