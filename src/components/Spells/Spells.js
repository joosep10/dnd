import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { Spell, AnyFilter } from 'components';

/*
fetch spells
spells, filteredSpells
spell = {
  ...details,
  isOpen,
}
filterSpells() {

}
filter = {casterClass, spellLevel, searchTerm}

ac
filter has history:
spells > 1. filter applied > 2. filter applied
addFilter(){}
removeFilter(){}

*/
export const Spells = () => {
  const [spells, setSpells] = useState(null);
  const [casterClass, setCasterClass] = useState('');
  const [level, setLevel] = useState('');
  const [displayLevelInfo, setDisplayLevelInfo] = useState(true);
  const [displayClassesInfo, setDisplayClassesInfo] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, true);
  }, []);
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      if (document.activeElement === searchInputRef.current) {
        setSearchTerm('');
        setCasterClass('');
        setLevel('');
        setDisplayLevelInfo(true);
        setDisplayClassesInfo(true);
      }
      searchInputRef.current.focus();
    }
  };
  const levelChange = levelId => {
    if (levelId) {
      if (levelId === level) {
        setLevel('');
        setDisplayLevelInfo(true);
      } else {
        setLevel(levelId);
        setDisplayLevelInfo(false);
      }
    } else {
      setDisplayLevelInfo(true);
    }
    window.scrollTo(0, 0);
  };
  const casterClassChange = c => {
    if (c === casterClass) {
      setDisplayClassesInfo(true);
      setCasterClass('');
    } else {
      setCasterClass(c);
      setDisplayClassesInfo(false);
    }
    window.scrollTo(0, 0);
  };
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

  if (spells) {
    return (
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <div className={styles.classFilter}>
              {casterClasses.map(c => (
                <AnyFilter
                  key={c.id}
                  name={c.name}
                  handleClick={() => casterClassChange(c.id)}
                  isActive={casterClass === c.id}
                />
              ))}
            </div>
            <div className={styles.levelFilter}>
              {levels.map(l => (
                <AnyFilter
                  key={l.id}
                  name={l.name}
                  handleClick={() => levelChange(l.id)}
                  isActive={level === l.id}
                />
              ))}
            </div>
            <input
              className={styles.searchFilter}
              ref={searchInputRef}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.spells}>
            {spells
              .filter(
                spell =>
                  (spell.level === level || level === '') &&
                  spell.class
                    .toLowerCase()
                    .includes(casterClass.toLowerCase()) &&
                  spell.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
              )
              .map(spell => (
                <Spell
                  key={spell.name}
                  name={spell.name}
                  description={spell.desc}
                  castingTime={spell.casting_time}
                  level={levels.find(l => l.id === spell.level).name}
                  range={spell.range}
                  duration={spell.duration}
                  components={spell.components}
                  concentration={spell.concentration}
                  school={spell.school}
                  classes={spell.class}
                  displayLevelInfo={displayLevelInfo}
                  displayClassesInfo={displayClassesInfo}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <>Spells</>;
  }
};
