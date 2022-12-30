import styles from './styles.module.css';
import { SpellRow } from 'components';
import { useState, useEffect } from 'react';

export const SpellList = ({ data }) => {
  const [openRow, setOpenRow] = useState(null);
  useEffect(() => {
    if (data && data.length === 1) setOpenRow(data[0].name);
    return () => setOpenRow(null);
  }, [data]);

  const handleRowClick = name => {
    if (name === openRow) setOpenRow(null);
    else setOpenRow(name);
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
