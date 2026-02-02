import { useNavigate } from "react-router-dom";

import ProjectForm from "../project/ProjectForm";

import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  function createProject(project) {
    project.cost = parseFloat(0);
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(project), //Retorna o nosso projeto pra conseguir enviar
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //redirect para projects
        navigate("/projects", {
          state: {
            message: "Projeto criado com sucesso",
          },
        });

      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adiconar os serviços</p>
      <ProjectForm handleSubmit={createProject} btnText={"Criar Projeto"} />
    </div>
  );
}

export default NewProject;
