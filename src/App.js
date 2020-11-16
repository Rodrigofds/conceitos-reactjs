import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {  
  const [repositories, setRepositories] = useState([]);

  // Listar meus repositórios
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  // Adiciona repositórios a lista
  async function handleAddRepository(){
    const response = await api.post('repositories', {
      title: `Trafficlights`,
      url: 'https://github.com/rodrigofds/trafficlights',
      techs: ['Node.js', 'React.Js', 'React Native']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !==id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
