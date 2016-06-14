import styles from './LogsView.styl';
import React from 'react';
import { observer } from 'mobx-react';
import LogEntry from '../LogEntry';
import NoLogs from './NoLogs';
import LogBuffer from './LogBuffer';

export const LogsView = ({ store }) => (
  <div className={styles.container}>
    {!store.hasLogs
      ? <NoLogs onSendTestLogClick={(obj) => store.sendTestLog(obj)} />
      : (
        <div>
          <div className={styles.viewTitle}>Log entries ({store.logs.length})</div>
          <LogBuffer bufferedLogs={store.logBuffer} onFlushClick={() => store.flushLogBuffer()} />
          {store.logs.map(log =>
            <LogEntry log={log} key={log.id} />
          )}
        </div>
      )
    }
  </div>
);

export default observer(LogsView);