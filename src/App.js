import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositorie, setRepositorie, deleteRepositorie] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositorie(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: "Klisman Ferreira",
      tech:"Javascript"
  });

    const repositories = response.data;

    setRepositorie([...repositorie, repositories]);
  }
  
  /*return (
    <>

        <ul>
            {repositorie.map(repositories => <li key={repositorie.id}>{repositories.title}</li>)}
        </ul>
        
        <button type="button" onClick={handleAddRepository}></button>
    </>
  );*/

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories',{
      id: `${Date.now()}`,
    });
    const repositorie = response.data;
    deleteRepositorie(repositorie);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1
          
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
        {repositorie.map(repositories => <li key={repositorie.id}>{repositories.title}</li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
