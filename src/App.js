import "./App.css";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const returnedData = await response.json();
    setSearchResult(returnedData.query.search);
    setSearchInfo(returnedData.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <h1>Wikipedia Viewer</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you interested in ?"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <p className="result-count">Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      <div className="results">
        {searchResult.map((result, index) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={index}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                More Information Here
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
