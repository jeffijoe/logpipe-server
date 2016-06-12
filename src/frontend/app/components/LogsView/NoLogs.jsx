import React from 'react';
import styles from './NoLogs.styl';
import cx from 'classnames';

/**
 * A nice, big butt...on.
 */
const BigButton = ({className, children, ...props}) => (
  <button
    className={cx(styles.hugeButton, className)}
    type="button"
    {...props}
  >
    {children}
  </button>
);

const TEST_LOG = '{"msg": "Hello world!", "lvl": "info", "data": {"more": "stuff"} }';

/**
 * Shown when there are no logs.
 */
const NoLogs = ({ onSendTestLogClick }) => (
  <div className={styles.noLogs}>
    <h3 className={styles.title}>
      Welcome to Logpipe, your neighbourhood-friendly development logger!
    </h3>
    <div className={styles.description}>
      Try running a <code>POST /api/logs</code> with a body of.. Oh I dunno..
      <div className={styles.exampleBody}>
        <code>{TEST_LOG}</code>
      </div>
      <div>
        ... that'll make stuff happen!
      </div>
      <div className={styles.actions}>
        <BigButton onClick={() => onSendTestLogClick(JSON.parse(TEST_LOG))}>
          Try it out
        </BigButton>
      </div>
    </div>
  </div>
);

export default NoLogs;