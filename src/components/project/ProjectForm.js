import { useState, useEffect } from "react";

import styles from "./ProjectForm.module.css";

import Input from "../form/Input";
import Select from "../form/Select";
import ButtonSubmit from "../form/ButtonSubmit";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (event) => {
    event.preventDefault();
    handleSubmit(project)
    // console.log(project);
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value }); //Vai continuar com a estrutura do projeto e indepente de qual for o nosos input name||budget vai pegar seus respectivos values
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Insira o nome do projeto"}
        name={"name"}
        text={"Nome do projeto"}
        handleOnChange={handleChange}
        value={project.name ? project.name : '' }
      />
      <Input
        type={"number"}
        text={"Orçamento do projeto"}
        placeholder={"Insira o orçamento do projeto"}
        name={"budget"}
        handleOnChange={handleChange}
        value={project.budget ? project.budget : '' }
      />

      <Select
        text={"Selecione a categoria"}
        name={"category_id"}
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : '' } //Verificamos se tem o id se não tiver ele retorna o id vazio, fazemos isso pela nossa primeira option de "selecione uma opção"
      />

      <ButtonSubmit text={btnText} />
    </form>
  );
}

export default ProjectForm;
