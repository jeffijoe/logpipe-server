import React from 'react';
import styles from './Header.styl';


const Header = ({onClickClearLogs}) => (
  <header className={styles.header}>
    <div className={styles.brand}>
      Logpipe
    </div>
    <div className={styles.mainActions}>

    </div>
    <div className={styles.rightActions}>
      <button className={styles.clearLogsButton} onClick={onClickClearLogs}>
        Clear Logs
      </button>
    </div>
  </header>
);

export default Header;