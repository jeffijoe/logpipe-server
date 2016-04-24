import React from 'react';
import styles from './LogEntry.styl';
import cx from 'classnames';

export const LogEntry = ({log}) => (
  <div className={cx(
    styles.logEntry,
    styles[log.level]
  )}>
    <div className={styles.message}>{log.message}</div>
    <div className={styles.timeStamp}>
      {log.timestamp.format('LL LT')}
    </div>
  </div>
);

export default LogEntry;