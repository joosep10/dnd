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
          const t =
            myJson[casterClassId]['Class Features'][
              `The ${casterClassId}`
            ]['table'];
          console.log(t);
          setTable(t);
        });
    }
  }, [casterClassId]);

  return table && <ClassTable table={table} />;
};
