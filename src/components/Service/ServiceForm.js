import styles from "../project/ProjectForm.module.css";

import { useState } from "react";

import Input from "../form/Input";
import ButtonSubmit from "../form/ButtonSubmit";

function ServiceForm({ handleSubmit, BtnText, projectData }) {
  const [service, setService] = useState();

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        text={"Nome do serviço"}
        name={"name"}
        placeholder={"Digite o nome do serviço"}
        handleOnChange={handleChange}
      />
      <Input
        text={"Valor do serviço"}
        name={"cost"}
        placeholder={"Digite o preço do serviço"}
        handleOnChange={handleChange}
      />
      <Input
        text={"Descrição do serviço"}
        name={"description"}
        placeholder={"Descreva o serviço"}
        handleOnChange={handleChange}
      />

      <ButtonSubmit text={BtnText} />
    </form>
  );
}

export default ServiceForm;
