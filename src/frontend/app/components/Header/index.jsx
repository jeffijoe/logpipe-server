import React from 'react';
import styles from './Header.styl';
import { observer } from 'mobx-react';

const Header = ({onClickClearLogs, onClickToggleBuffer, isBuffering}) => (
  <header className={styles.header}>
    <div className={styles.brand}>
      Logpipe
    </div>
    <div className={styles.mainActions}>
    </div>
    <div className={styles.rightActions}>
      <button className={styles.bufferButton} onClick={onClickToggleBuffer}>
        {isBuffering
          ? 'Stop buffering logs'
          : 'Start buffering logs'
        }
      </button>
      &nbsp;
      <button className={styles.clearLogsButton} onClick={onClickClearLogs}>
        Clear Logs
      </button>
    </div>
  </header>
);

export default observer(Header);