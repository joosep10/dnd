export const Table = ({ spells }) => {
  console.log(spells[0]);
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>School</th>
          <th>Classes</th>
        </tr>
        {spells.map(spell => {
          return (
            <tr key={Math.random() * 100000}>
              <td>{spell.name}</td>
              <td>{spell.school}</td>
              <td>{spell.class}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
