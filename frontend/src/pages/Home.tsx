import { useQuery } from "@apollo/client";
import { COUNTRY_QUERY } from "../api/example";
import { Link, useNavigate } from "react-router-dom";

type Continent = {
  id: string;
  name: string;
};

type Country = {
  id: string;
  name: string;
  code: string;
  emoji: string;
  continent: Continent;
};

export function HomePage() {
  const navigate = useNavigate();
  const { data } = useQuery(COUNTRY_QUERY);
  const allContries = data?.countries ?? [];

  return (
    <section>
      <Link to="/create">Ajouter une pays</Link>
      {allContries.map((c: Country) => {
        const data = {
          name: c.name,
          code: c.code,
          emoji: c.emoji,
          continent: c.continent,
        };
        return (
          <div
            key={c.id}
            onClick={() => navigate(`/${c.id}`, { state: { data } })}
          >
            <h1>{c.name}</h1>
            <p>{c.code}</p>
            <p>{c.emoji}</p>
            <p>{c.continent.name}</p>
          </div>
        );
      })}
    </section>
  );
}
