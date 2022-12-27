import styles from './styles.module.css';
import { useState } from 'react';

export const Spell = ({
  name,
  description,
  castingTime,
  classes,
  components,
  duration,
  level,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.spell}>
      <div className={styles.spellName} onClick={() => setIsOpen(!isOpen)}>
        {name}
      </div>
      {isOpen && (
        <div className={styles.spellDetails}>
          <div>
            <b>Casting Time:</b> {castingTime}
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
};
