import styles from './styles.module.css';
import { Spells, Combat } from 'components';

export const App = () => {
  return (
    <div className={styles.main}>
      Hello
      <Spells />
    </div>
  );
};
