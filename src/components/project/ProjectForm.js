import styles from "./ProjectForm.module.css";

import Input from "../form/Input";
import Select from "../form/Select";
import ButtonSubmit from "../form/ButtonSubmit";

function ProjectForm({btnText}) {
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

      />
      
      <ButtonSubmit text={btnText}/>
    </form>
  );
}

export default ProjectForm;
