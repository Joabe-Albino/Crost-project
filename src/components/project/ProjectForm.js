import { useState, useEffect } from "react";

import styles from "./ProjectForm.module.css";

import Input from "../form/Input";
import Select from "../form/Select";
import ButtonSubmit from "../form/ButtonSubmit";

function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {setCategories(data)})
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Insira o nome do projeto"}
        name={"name"}
        text={"Nome do projeto"}
      />
      <Input
        type={"number"}
        text={"Orçamento do projeto"}
        placeholder={"Insira o orçamento do projeto"}
        name={"budget"}
      />

      <Select
        text={"Selecione a categoria"}
        name={"category_id"}
        options={categories}
      />

      <ButtonSubmit text={btnText} />
    </form>
  );
}

export default ProjectForm;
