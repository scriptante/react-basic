import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    }
    load();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const response = await api.post("/repositories", {
      title,
      url,
      techs,
    });
    setRepositories([...repositories, response.data]);
  }

  function handleTechsCheckbox(checkbox) {
    if (checkbox.checked) {
      setTechs([...techs, checkbox.value]);
    } else {
      setTechs(techs.filter((tech) => tech !== checkbox.value));
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <section>
        <h2>Lista de Repositorios</h2>
        <ul data-testid="repository-list">
          {repositories.map((repo) => (
            <li key={repo.id}>
              <p className="name">
                Titulo: <span>{repo.title}</span>
              </p>
              <p>
                Url: <a href={repo.url}>{repo.url}</a>
              </p>
              <p>
                Technologias: <br />
                {repo.techs.map((tech) => (
                  <span key={tech}>
                    {tech}
                    <br />
                  </span>
                ))}
              </p>
              <p>Likes: {repo.likes}</p>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Adicionar repositorio</h2>
        <form>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Url</label>
            <input
              type="text"
              name="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <article>
            <h3>Tecnologias</h3>
            <label>
              <input
                type="checkbox"
                name="react"
                value="react"
                onChange={(e) => handleTechsCheckbox(e.target)}
              />
              react
            </label>
            <label>
              <input
                type="checkbox"
                name="node.js"
                value="node.js"
                onChange={(e) => handleTechsCheckbox(e.target)}
              />
              node.js
            </label>
            <label>
              <input
                type="checkbox"
                name="electron"
                value="electron"
                onChange={(e) => handleTechsCheckbox(e.target)}
              />
              electron
            </label>
          </article>

          <button onClick={handleAddRepository}>Adicionar</button>
        </form>
      </section>
    </div>
  );
}

export default App;
