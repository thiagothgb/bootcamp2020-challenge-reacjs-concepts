import React, { useState, useEffect, useCallback } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);

  const loadRepositories = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("repositories");

      setRepositories(data);
    } catch (err) {
      alert("Something wrong happened");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    try {
      const { data } = await api.post(`repositories`, newRepository);
      setRepositories([...repositories, data]);
    } catch (error) {
      alert("Something wrong happened");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter((i) => i.id !== id));
    } catch (err) {
      alert("Something wrong happened");
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          const { id, title } = repository;
          return (
            <li key={String(id)}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
