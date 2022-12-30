import styles from './styles.module.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Options } from 'components';
import { SpellList } from './SpellList';
import { fuzzyTestMatch, mySort } from 'helpers/helpers';
import dottle from 'lodash.debounce';

export const Spells = () => {
  const [spells, setSpells] = useState(null);
  const [casterClass, setCasterClass] = useState(null);
  const [level, setLevel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // listen to escape key press
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, true);
  }, []);
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      if (document.activeElement === searchInputRef.current) {
        setSearchTerm(null);
        document.getElementById('searchInput').value = '';
        // setCasterClass('');
        // setLevel('');
        // setDisplayLevelInfo(true);
        // setDisplayClassesInfo(true);
      }
      searchInputRef.current.focus();
    }
  };

  //
  // const levelChange = levelId => {
  //   if (levelId) {
  //     if (levelId === level) {
  //       setLevel('');
  //       setDisplayLevelInfo(true);
  //     } else {
  //       setLevel(levelId);
  //       setDisplayLevelInfo(false);
  //     }
  //   } else {
  //     setDisplayLevelInfo(true);
  //   }
  //   window.scrollTo(0, 0);
  // };
  // const casterClassChange = c => {
  //   if (c === casterClass) {
  //     setDisplayClassesInfo(true);
  //     setCasterClass('');
  //   } else {
  //     setCasterClass(c);
  //     setDisplayClassesInfo(false);
  //   }
  //   window.scrollTo(0, 0);
  // };

  const casterClasses = [
    { id: 'Artificer', name: 'Ar' },
    { id: 'Bard', name: 'Ba' },
    { id: 'Cleric', name: 'Cl' },
    { id: 'Druid', name: 'Dr' },
    { id: 'Paladin', name: 'Pa' },
    { id: 'Ranger', name: 'Ra' },
    { id: 'Sorcerer', name: 'So' },
    { id: 'Warlock', name: 'Wa' },
    { id: 'Wizard', name: 'Wi' },
  ];
  const levels = [
    { id: 'Cantrip', name: '0' },
    { id: '1st-level', name: '1' },
    { id: '2nd-level', name: '2' },
    { id: '3rd-level', name: '3' },
    { id: '4th-level', name: '4' },
    { id: '5th-level', name: '5' },
    { id: '6th-level', name: '6' },
    { id: '7th-level', name: '7' },
    { id: '8th-level', name: '8' },
    { id: '9th-level', name: '9' },
  ];

  // fetch spells
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

  // filter spells
  const filterSpells = () => {
    let filteredSpells = [...spells];
    if (casterClass) {
      filteredSpells = filteredSpells.filter(spell =>
        spell.class.includes(casterClass),
      );
    }
    if (level) {
      filteredSpells = filteredSpells.filter(
        spell => spell.level === level,
      );
    }
    if (searchTerm) {
      filteredSpells = filteredSpells.filter(spell =>
        fuzzyTestMatch(spell.name.toLowerCase(), searchTerm.toLowerCase()),
      );
      mySort(filteredSpells, searchTerm.toLowerCase());
    }
    return filteredSpells;
  };

  // to keep the  debounced function alive - useCallback
  const debouncedChangeHandler = useCallback(
    dottle(e => setSearchTerm(e.target.value), 300),
    [],
  );
  // cleanup the debounced function when component umounts
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  if (spells) {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.container}>
            <Options
              key="casterClassesOptions"
              data={casterClasses}
              onChange={id => setCasterClass(id)}
            />
            <Options
              key="levelOptions"
              data={levels}
              onChange={id => setLevel(id)}
            />
            <input
              id="searchInput"
              autocomplete="off"
              className={styles.searchFilter}
              ref={searchInputRef}
              onChange={debouncedChangeHandler}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.container}>
            <SpellList key="spellList" data={filterSpells()} />
          </div>
        </div>
      </div>
    );
  } else {
    return <>Spells</>;
  }
};
