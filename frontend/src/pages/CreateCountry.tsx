import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CONTINENT_QUERY, CREATE_COUNTRY } from "../api/example";

export default function CreateCountry() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [continentId, setContinentId] = useState("");
  const [message, setMessage] = useState("");

  const { data: dataContinent, loading, error } = useQuery(CONTINENT_QUERY);
  const allContinents = dataContinent?.continents ?? [];

  const [addCountry, { loading: creating, error: creationError }] = useMutation(
    CREATE_COUNTRY,
    {
      onCompleted: () => {
        setMessage("Country created successfully!");
        setName("");
        setCode("");
        setEmoji("");
        setContinentId("");
      },
      onError: (error) => {
        setMessage(`Error creating country: ${error.message}`);
      },
    }
  );

  const handleSubmit = async () => {
    if (!name || !code || !emoji || !continentId) {
      setMessage("All fields are required.");
      return;
    }

    try {
      await addCountry({
        variables: {
          data: {
            name,
            code,
            emoji,
            continent: { id: continentId },
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading continents...</p>;
  if (error) return <p>Error loading continents: {error.message}</p>;

  return (
    <section>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      />
      <select
        value={continentId}
        onChange={(e) => setContinentId(e.target.value)}
      >
        <option value="">Select a Continent</option>
        {allContinents.map((continent: { id: string; name: string }) => (
          <option key={continent.id} value={continent.id}>
            {continent.name}
          </option>
        ))}
      </select>
      <button type="button" disabled={creating} onClick={handleSubmit}>
        {creating ? "Creating..." : "Create Country"}
      </button>
      {message && <p>{message}</p>}
      {creationError && <p style={{ color: "red" }}>{creationError.message}</p>}
    </section>
  );
}
