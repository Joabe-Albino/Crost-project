import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { parse, v4 as uuidv4 } from "uuid";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../Service/ServiceForm";
import Message from "../layout/Message";
import ServiceCard from "../Service/ServiceCard.js";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [showService, setShowService] = useState(false);
  const [message, setMessage] = useState();
  const [type, settype] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function toggleProjectFrom() {
    setShowProject(!showProject);
  }

  function toggleServiceForm() {
    setShowService(!showService);
  }

  function editProject(project) {
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo");
      settype("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProject(false);
        setMessage("Projeto atualizado com sucesso!");
        settype("success");
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, serviço é maior que o orçamento");
      settype("error");
      project.services.pop();
      return false;
    }

    project.cost = parseFloat(newCost);

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then(() => {
        setShowService(false)
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    const serviceUpdated = project.services.filter((service) => 
      service.id !== id
    )

    const projectUpdated = project

    projectUpdated.services = serviceUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(projectUpdated)
    }).then(resp => resp.json()).then((data) => {
      setProject(projectUpdated)
      setServices(serviceUpdated)
      setMessage("Serviço excluido com sucesso!")
      settype("success")
    }).catch(err => console.log(err))

  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>{project.name}</h1>
              <button onClick={toggleProjectFrom} className={styles.btn}>
                {!showProject ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProject ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editProject}
                    btnText={"Concluir Edição"}
                    projectData={project}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showService ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showService && (
                  <ServiceForm
                    handleSubmit={createService}
                    BtnText={"Adicionar serviço"}
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    handleRemove={removeService}
                    key={service.id}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
