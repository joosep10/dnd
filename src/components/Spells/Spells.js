import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { Spell, ClassFilter } from 'components';

export const Spells = () => {
  const [spells, setSpells] = useState(null);
  const [casterClass, setCasterClass] = useState('');
  const casterClasses = [
    'All',
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

  useEffect(() => {
    fetch('./spells.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => {
        console.log('Response: ', response);
        return response.json();
      })
      .then(myJson => {
        console.log(myJson[0]);
        setSpells(myJson);
      });
  }, []);

  if (spells) {
    return (
      <div className={styles.main}>
        <div className={styles.classFilter}>
          {casterClasses.map(c => (
            <ClassFilter
              key={c}
              name={c}
              handleClick={() => setCasterClass(c)}
              isActive={casterClass === c}
            />
          ))}
        </div>
        {spells
          .filter(
            spell =>
              spell.level === '1st-level' &&
              spell.class
                .toLowerCase()
                .includes(casterClass.toLowerCase()),
          )
          .map(spell => (
            <Spell
              key={spell.name}
              name={spell.name}
              description={spell.desc}
              castingTime={spell.casting_time}
            />
          ))}
      </div>
    );
  } else {
    return <>Spells</>;
  }
};
