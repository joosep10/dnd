import styles from './styles.module.css';
import { DoubleClickInput } from './DoubleClickInput';

export const Card = ({
  id,
  name,
  initiative,
  updateInitiative,
  updateName,
  onRemoveClick,
}) => {
  const handleKeyDown = e => {
    const { key } = e;
    if (key === 'Enter') updateInitiative(id, e);
  };
  const currentBackground = initiative < 10 ? styles.low : '';

  return (
    <div className={`${styles.card} ${currentBackground}`}>
      <div>
        <DoubleClickInput
          type="text"
          defaultValue={name}
          className={styles.playerName}
          commitChanges={evt => updateName(id, evt)}
        ></DoubleClickInput>
        <div className={styles.field}>
          <label>Initiative</label>
          <input
            className={styles.initInput}
            type="number"
            defaultValue={initiative}
            onKeyDown={handleKeyDown}
            //onChange={e => onInitiativeChange(id, e)}
          ></input>
        </div>
      </div>
      <button className={styles.button} onClick={() => onRemoveClick(id)}>
        Remove
      </button>
    </div>
  );
};
