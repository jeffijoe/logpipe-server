import React from 'react';
import styles from './LogBuffer.styl';
import {observer} from 'mobx-react';
import Button from 'components/Button';

const LogBuffer = ({ bufferedLogs, onFlushClick }) => (
  <div className={styles.container}>
    {bufferedLogs.length > 0 &&
      <div className={styles.inner}>
          <Button onClick={() => onFlushClick()}>{bufferedLogs.length} buffered logs</Button>
      </div>
    }
  </div>
);

export default observer(LogBuffer);