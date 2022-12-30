import styles from './styles.module.css';

export const SpellRow = ({ data, onClick, isOpen }) => {
  return (
    <div className={styles.spellRow} onClick={onClick}>
      <div className={styles.essential}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.details}>
          <div>{data.casting_time}</div>
          <div>{data.duration}</div>
          <div>{data.range}</div>
          <div>{data.school}</div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.extra}>
          <div>
            <b>Casting Time:</b> {data.casting_time}
          </div>
          <div>
            <b>Range:</b> {data.range}
          </div>
          <div>
            <b>Components:</b> {data.components}
          </div>
          <div>
            <b>Duration:</b> {data.duration}
          </div>
          <div>
            <b>Level:</b> {data.level}
          </div>
          <div>
            <b>Classes:</b> {data.class}
          </div>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
        </div>
      )}
    </div>
  );
};
