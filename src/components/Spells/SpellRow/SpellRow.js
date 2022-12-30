import styles from './styles.module.css';

export const SpellRow = ({ data, handleClick, isOpen }) => {
  return (
    <div id={data.name} className={styles.spellRow}>
      <div className={styles.essential} onClick={handleClick}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.details}>
          <div>{data.casting_time}</div>
          <div>{data.duration}</div>
          <div>{data.range}</div>
          <div>{data.school}</div>
          <div className={styles.concentrationColumn}>
            {data.concentration === 'yes' && 'c'}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.extra}>
          <div className={styles.showOnSmallScreen}>
            <b>Casting Time:</b> {data.casting_time}
          </div>
          <div className={styles.showOnSmallScreen}>
            <b>Range:</b> {data.range}
          </div>
          <div className={styles.showOnSmallScreen}>
            <b>Duration:</b> {data.duration}
          </div>
          <div className={styles.showOnSmallScreen}>
            <b>Concentration:</b> {data.concentration}
          </div>

          <div>
            <b>Components:</b> {data.components}
          </div>
          <div>
            <b>Level:</b> {data.level}
          </div>
          <div>
            <b>Classes:</b> {data.class}
          </div>
          <div className={styles.school}>
            <b>School:</b> {data.school}
          </div>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
          {data.higher_level && (
            <div>
              <b>Higher levels:</b>
              <span
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: data.higher_level }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
