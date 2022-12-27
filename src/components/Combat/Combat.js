import styles from './styles.module.css';
import { Card } from './Card';
import { useState, useEffect } from 'react';
import { EditableTextField } from 'EditableTextField';

export const Combat = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Tamman', initiative: 12 },
    { id: 2, name: 'Rye', initiative: 13 },
    { id: 3, name: 'Randall', initiative: 13 },
    { id: 4, name: 'Umhr', initiative: 13 },
  ]);
  // useEffect(() => {
  //   const timeout = setTimeout(sortPlayers, 500);
  //   return () => clearTimeout(timeout);
  // }, [players]);

  const updateInitiative = (id, e) => {
    const value = Number(e.target.value);
    const index = players.findIndex(player => player.id === id);
    const updatedPlayer = { ...players[index], initiative: value };
    setPlayers(players =>
      players.map(player => (player.id === id ? updatedPlayer : player)),
    );
    sortPlayers();
  };
  const updateName = (id, evt) => {
    const value = evt.target.value;
    const index = players.findIndex(player => player.id === id);
    const updatedPlayer = { ...players[index], name: value };
    setPlayers(players =>
      players.map(player => (player.id === id ? updatedPlayer : player)),
    );
  };
  const sortPlayers = () => {
    setPlayers(players =>
      players.sort((l, r) => r.initiative - l.initiative),
    );
  };
  const removePlayer = id => {
    setPlayers(players => players.filter(player => player.id != id));
  };
  const addPlayer = () => {
    setPlayers([
      ...players,
      {
        id: Math.floor(Math.random() * 100000000),
        name: 'New Player',
        initiative: -100,
      },
    ]);
  };

  return (
    <div className={styles.main}>
      <button className={styles.button} onClick={addPlayer}>
        Add player
      </button>
      <EditableTextField text="This is some text" />
      {players.map(player => (
        <Card
          key={player.id}
          id={player.id}
          name={player.name}
          initiative={player.initiative}
          updateInitiative={updateInitiative}
          updateName={updateName}
          onRemoveClick={removePlayer}
        />
      ))}
    </div>
  );
};
