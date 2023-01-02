import styles from './styles.module.css';

const randomId = () => Math.random() * 1000000;

const columnsToRows = obj => {
  const keys = Object.keys(obj);
  const rows = obj[keys[0]].length;
  let arr = [keys];
  for (let j = 0; j < rows; j++) {
    let row = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      row.push(obj[key][j]);
    }
    arr.push(row);
  }
  return arr;
};

export const ClassTable = ({ table }) => {
  const arr = columnsToRows(table);
  const [head, ...body] = arr;
  return (
    <table>
      <thead>
        <tr>
          {head.map(item => (
            <th key={randomId()} className={styles[item.toLowerCase()]}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map(row => {
          return (
            <tr key={randomId()}>
              {row.map((item, idx) => (
                <td
                  key={randomId()}
                  className={styles[head[idx].toLowerCase()]}
                >
                  {item}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
