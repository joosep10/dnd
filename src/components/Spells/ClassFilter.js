import styles from './styles.module.css';

export const ClassFilter = ({ name, handleClick, style, isActive }) => (
  <div
    className={`${styles.casterClass} ${isActive ? styles.active : ''}`}
    onClick={handleClick}
  >
    {name}
  </div>
);
