import styles from './styles.module.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MyInput,
  Options,
  SpellList,
  SpellSlots,
  LoginModal,
} from 'components';
import { fuzzyTestMatch, mySort } from 'helpers/helpers';
import { RxTable } from 'react-icons/rx';
import debounce from 'lodash.debounce';
import { IconContext } from 'react-icons';
import { createClient } from '@supabase/supabase-js';
import { projectUrl, anonKey, casterClasses, levels } from 'lib/constants';

// Create a single supabase client for interacting with your database

const something = 'other thing';
const supabase = createClient(projectUrl, anonKey);

export const Spells = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [spells, setSpells] = useState(null);
  const [casterClass, setCasterClass] = useState(null);
  const [level, setLevel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tablesOn, setTablesOn] = useState(false);
  const searchInputRef = useRef(null);

  // listen to escape key press
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, true);
  }, []);
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      if (document.activeElement === searchInputRef.current) {
        setSearchTerm(null);
        searchInputRef.current.value = '';
      }
      searchInputRef.current.focus();
    }
  };

  // fetch spells
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('spells')
        .select()
        .order('level_nr')
        .order('name');
      setSpells(data);
      console.log(error);
    };
    fetchData();
  }, []);

  // filter spells
  const filterSpells = () => {
    let filteredSpells = [...spells];
    if (casterClass) {
      filteredSpells = filteredSpells.filter(spell =>
        spell.class.includes(casterClass),
      );
    }
    if (level) {
      filteredSpells = filteredSpells.filter(
        spell => spell.level_nr === level,
      );
    }
    if (searchTerm) {
      filteredSpells = filteredSpells.filter(spell =>
        fuzzyTestMatch(spell.name.toLowerCase(), searchTerm.toLowerCase()),
      );
      mySort(filteredSpells, searchTerm.toLowerCase());
    }
    return filteredSpells;
  };

  // to keep the  debounced function alive - useCallback
  const debouncedChangeHandler = useCallback(
    debounce(e => setSearchTerm(e.target.value), 300),
    [],
  );
  // cleanup the debounced function when component umounts
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const rowOpenSideEffects = () => {
    searchInputRef.current.blur();
  };
  if (spells) {
    return (
      <>
        {modalVisible && (
          <LoginModal closeClick={() => setModalVisible(false)} />
        )}
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.container}>
              <Options
                key="casterClassesOptions"
                data={casterClasses}
                onChange={id => setCasterClass(id)}
              />
              <Options
                key="levelOptions"
                data={levels}
                onChange={id => setLevel(id)}
              />
              <div className={styles.searchNStuff}>
                <IconContext.Provider
                  value={{
                    className: `${styles.icon} ${
                      tablesOn && styles.active
                    }`,
                  }}
                >
                  <RxTable onClick={() => setTablesOn(!tablesOn)} />
                </IconContext.Provider>

                <MyInput
                  onChange={debouncedChangeHandler}
                  _ref={searchInputRef}
                  closeClick={() => setSearchTerm(null)}
                />
                <div
                  className={styles.login}
                  onClick={() => setModalVisible(true)}
                >
                  Login
                </div>
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.container}>
              {(!tablesOn && (
                <SpellList
                  key="spellList"
                  data={filterSpells()}
                  rowOpenSideEffects={rowOpenSideEffects}
                />
              )) || <SpellSlots casterClassId={casterClass} />}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <>Loading spells...</>;
  }
};
