import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export const Options = ({ data, onChange }) => {
  const [activeOption, setActiveOption] = useState(null);
  const clickedOption = option => {
    if (activeOption === option) setActiveOption(null);
    else setActiveOption(option);
  };
  useEffect(() => {
    onChange(activeOption);
  }, [activeOption]);

  return (
    <div className={styles.options}>
      {data.map(option => {
        return (
          <div
            key={option.id}
            className={`${styles.option}  ${
              activeOption === option.id ? styles.active : ''
            }`}
            onClick={() => clickedOption(option.id)}
          >
            {option.name}
          </div>
        );
      })}
    </div>
  );
};
