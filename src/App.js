import React, { useState } from "react";
import useDataApi from "./hooks/useDataApi";
import "./App.css";

function App() {
  const [query, setQuery] = useState("redux");

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data?.hits?.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default App;
