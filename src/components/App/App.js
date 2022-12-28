import styles from './styles.module.css';
import { Spells } from 'components';

export const App = () => {
  return (
    <div className={styles.main}>
      <Spells />
    </div>
  );
};
