import styles from './styles.module.css';
import { SpellRow } from 'components';
import { useState, useEffect } from 'react';

export const SpellList = ({ data }) => {
  const [openRow, setOpenRow] = useState(null);

  // if only one spell in list open it up
  useEffect(() => {
    if (data && data.length === 1) setOpenRow(data[0].name);
    return () => setOpenRow(null);
  }, [data]);

  // scroll opened row into view
  useEffect(() => {
    if (openRow)
      document.getElementById(openRow).scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behaviour: 'smooth',
      });
  }, [openRow]);

  const handleRowClick = name => {
    if (name === openRow) setOpenRow(null);
    else {
      setOpenRow(name);
    }
  };
  return (
    <div className={styles.spellList}>
      {data.map(spell => {
        return (
          <SpellRow
            key={spell.name}
            data={spell}
            onClick={() => handleRowClick(spell.name)}
            isOpen={spell.name === openRow}
          />
        );
      })}
    </div>
  );
};
