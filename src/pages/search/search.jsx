import React from "react";
import './search.css';

function Search() {
    const [inputValue, setInputValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [repos, setRepos] = React.useState([]);
  
    React.useEffect(() => {
      if(!inputValue) {
        return
      }
  
      setIsLoading(true);
  
      fetch("https://api.github.com/orgs/" + inputValue + "/repos?per_page=50")
        .then(response => {
          return response.json();
        })
        .then(data => {
          setIsLoading(false);
          setRepos(data)
        }).catch(err => {
          setIsLoading(false);
          console.error(err);
        });
    }, [inputValue]);
  
    return( 

      <div>
            <nav>
                <label className="tittle">Github Repository Search</label>
                <ul>
                    <li><a className="active" href="/">Busca</a></li>
                    <li><a href="/Sobre">Sobre</a></li>   
                </ul>            
            </nav> 
        <header>
        <form
          id="search"
          onSubmit={(evt) => {
            evt.preventDefault();
            setInputValue(evt.target.elements.query.value);
          }}
        >
          <input type="text" name="query" className="search_input" placeholder="Nome da organização"/>
          <button type="submit">Buscar</button>
        </form>
        </header>        

        <div className="container_itens">
        {isLoading && <div id="loading">Loading...</div>}
        {!isLoading  && repos.message === "Not Found" && <div>Página não encontrada.</div>}
        <ul className="repo_list">
          {repos.length > 0 && repos?.map(repo => {
            return <li key={repo.id} className="repo_item">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                 {repo.name}
              </a>
              <p>{repo.description}</p>
              </li>
            
          })}
        </ul>
        </div>
      </div>
    );
  }

  export default Search;