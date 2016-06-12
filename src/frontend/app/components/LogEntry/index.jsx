import React from 'react';
import styles from './LogEntry.styl';
import cx from 'classnames';
import { observer } from 'mobx-react';
import Button from 'components/Button';

export const LogEntry = ({log}) => (
  <div className={cx(
    styles.logEntry,
    styles[log.level]
  )}>
    <div className={styles.primary}>
      <div className={styles.info}>
        <div className={styles.message}>{log.message}</div>
        <div className={styles.timeStamp}>
          {log.timestamp.format('LL LT')}
        </div>
      </div>
      <div className={styles.actions}>
        {log.data &&
          <Button onClick={() => log.toggleDetails()}>
            {log.expanded
              ? <span>▲ Hide details</span>
              : <span>▼ Show details</span>
            }
          </Button>
        }
      </div>
    </div>
    {log.expanded &&
      <pre className={styles.details}>{JSON.stringify(log.data, null, 2)}</pre>
    }
  </div>
);

export default observer(LogEntry);