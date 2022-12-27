import styles from './styles.module.css';

export const AnyFilter = ({ name, handleClick, isActive }) => (
  <div
    className={`${styles.filter} ${isActive ? styles.active : ''}`}
    onClick={handleClick}
  >
    {name}
  </div>
);
