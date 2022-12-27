import styles from './styles.module.css';
import { useState } from 'react';

export const Spell = ({
  name,
  description,
  castingTime,
  classes,
  components,
  duration,
  range,
  level,
  displayLevelInfo,
  displayClassesInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.spell}>
      <div
        className={styles.spellName}
        onClick={() => setIsOpen(!isOpen)}
        style={{ textDecoration: isOpen && 'underline' }}
      >
        {name}
      </div>
      {isOpen && (
        <div className={styles.spellDetails}>
          <div>
            <b>Casting Time:</b> {castingTime}
          </div>
          <div>
            <b>Range:</b> {range}
          </div>
          <div>
            <b>Components:</b> {components}
          </div>
          <div>
            <b>Duration:</b> {duration}
          </div>
          {displayLevelInfo && (
            <div>
              <b>Level:</b> {level}
            </div>
          )}
          {displayClassesInfo && (
            <div>
              <b>Classes:</b> {classes}
            </div>
          )}

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
};
