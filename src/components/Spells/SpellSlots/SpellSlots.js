// TODO: change the name of this damn thing
import { useEffect, useState } from 'react';
import { ClassTable } from 'components';

export const SpellSlots = ({ casterClassId }) => {
  const [table, setTable] = useState();
  // -------------
  useEffect(() => {
    if (casterClassId) {
      fetch('./classes.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          const classFeatures = myJson[casterClassId]['Class Features'];
          const keys = Object.keys(classFeatures);
          console.log('keys: ', keys);
          const t = classFeatures[`The ${casterClassId}`]['table'];
          setTable(t);
        });
    }
  }, [casterClassId]);

  return table && <ClassTable table={table} />;
};
