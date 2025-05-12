import { useLocation } from "react-router-dom";

export default function Country() {
  const location = useLocation();
  const { data } = location.state;

  return (
    <section>
      <h1>{data.name}</h1>
      <p>{data.code}</p>
      <p>{data.emoji}</p>
      <p>{data.continent.name}</p>
    </section>
  );
}
