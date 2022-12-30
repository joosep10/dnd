import styles from './styles.module.css';
import { useState } from 'react';

export const Spell = ({ data, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.spell}>
      <div
        className={styles.spellName}
        onClick={() => setIsOpen(!isOpen)}
        style={{ textDecoration: isOpen && 'underline' }}
      >
        {data.name}
      </div>
      {isOpen && (
        <div className={styles.spellDetails}>
          <div>
            <b>Casting Time:</b> {data.casting_time}
          </div>
          <div>
            <b>Range:</b> {data.range}
          </div>
          <div>
            <b>Components:</b> {data.components}
          </div>
          <div>
            <b>Duration:</b> {data.duration}
          </div>
          <div>
            <b>Level:</b> {data.level}
          </div>
          <div>
            <b>Classes:</b> {data.class}
          </div>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
        </div>
      )}
    </div>
  );
};