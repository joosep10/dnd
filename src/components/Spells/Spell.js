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
  displayExtraSpellInfo,
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
          {displayExtraSpellInfo && (
            <div>
              <div>
                <b>Level:</b> {level}
              </div>
              <div>
                <b>Classes:</b> {classes}
              </div>
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
