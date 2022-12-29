import styles from './styles.module.css';
import { Table } from './Table';

import { useState, useEffect, useRef } from 'react';
export const SearchFilter = () => {
  // define state and refs
  const searchInput = useRef(null);
  const [spells, setSpells] = useState([[]]);

  // HELPER FUNCTIONS
  // ----------------
  const filterSpells = e => {
    if (e.key === 'Backspace') console.log('go back to: ', e.target.value);
    else {
      console.log(e.target.value);
    }
  };

  // wu

  // LISTEN TO ESCAPE PRESS
  // --------------------
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, true);
  }, []);
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      if (document.activeElement === searchInput.current) {
      }
      searchInput.current.focus();
    }
  };

  // FETCH SPELLS
  // -------------
  useEffect(() => {
    fetch('./spells.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setSpells(myJson);
      });
  }, []);

  // RETURN TO RENDER
  // ----------------
  return (
    <div className={styles.searchFilter}>
      <div className={styles.header}>
        <input
          type="text"
          ref={searchInput}
          onKeyDown={e => filterSpells(e)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.body}>
        <Table spells={spells} />
      </div>
    </div>
  );
};
