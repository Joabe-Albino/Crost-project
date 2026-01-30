import styles from './ButtonSubmit.module.css'

function ButtonSubmit({ text }) {
  return (
    <div >
      <button className={styles.btn}>{text}</button>
    </div>
  );
}

export default ButtonSubmit
