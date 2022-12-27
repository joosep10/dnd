import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { Spell, AnyFilter } from 'components';

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
  };
  const casterClassChange = c => {
    if (c === casterClass) {
      setDisplayClassesInfo(true);
      setCasterClass('');
    } else {
      setCasterClass(c);
      setDisplayClassesInfo(false);
    }
  };
  const casterClasses = [
    'Artificer',
    'Bard',
    'Cleric',
    'Druid',
    'Paladin',
    'Ranger',
    'Sorcerer',
    'Warlock',
    'Wizard',
  ];
  const levels = [
    { id: 'Cantrip', name: 'Cantrip' },
    { id: '1st-level', name: '1st' },
    { id: '2nd-level', name: '2nd' },
    { id: '3rd-level', name: '3rd' },
    { id: '4th-level', name: '4th' },
    { id: '5th-level', name: '5th' },
    { id: '6th-level', name: '6th' },
    { id: '7th-level', name: '7th' },
    { id: '8th-level', name: '8th' },
    { id: '9th-level', name: '9th' },
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
      <div className={styles.main}>
        <div className={styles.classFilter}>
          {casterClasses.map(c => (
            <AnyFilter
              key={c}
              name={c}
              handleClick={() => casterClassChange(c)}
              isActive={casterClass === c}
            />
          ))}
        </div>
        <div className={styles.sidebar}>
          <input
            className={styles.searchFilter}
            ref={searchInputRef}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
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
        </div>
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
    );
  } else {
    return <>Spells</>;
  }
};
