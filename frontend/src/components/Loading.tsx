import styles from "../style/Loading.module.css";

const Loading = () => {
  return (
    <div data-testid="flex-container" className={styles.flexContainer}>
      <h1 className={styles.boxProgress} data-text="loading...">
        loading...
      </h1>
      <span className={styles.boxText}>please wait</span>
    </div>
  );
};

export default Loading;
