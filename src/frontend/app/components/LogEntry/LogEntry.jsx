import React from 'react';
import styles from './LogEntry.styl';
import cx from 'classnames';

export const LogEntry = ({log}) => (
  <div className={cx(
    styles.logEntry,
    styles[log.lvl]
  )}>
    <span className={styles.message}>{log.msg}</span>
  </div>
);

export default LogEntry;