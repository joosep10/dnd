import { RiCloseLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import styles from './styles.module.css';

export const MyInput = ({ onChange, closeClick, _ref }) => {
  const [displayClose, setDisplayClose] = useState(false);
  const shouldDisplayClose = () => {
    if (!_ref.current.value) {
      setDisplayClose(false);
    }
  };
  return (
    <div
      className={`${styles.inputWrapper} ${
        displayClose ? styles.active : ''
      }`}
    >
      <input
        id="searchInput"
        autoComplete="off"
        placeholder="Search"
        ref={_ref}
        onChange={e => onChange(e)}
        onFocus={() => setDisplayClose(true)}
        onBlur={shouldDisplayClose}
      />
      {
        <IconContext.Provider
          value={{
            className: styles.closeIcon,
          }}
        >
          <RiCloseLine
            onClick={() => {
              const inp = document.getElementById('searchInput');
              inp.value = '';
              setDisplayClose(false);
              closeClick();
            }}
          />
        </IconContext.Provider>
      }
    </div>
  );
};
