import React from 'react';
import styles from './Button.styl';
import cx from 'classnames';

const Button = ({ className, children, ...other}) => (
  <button className={cx(styles.button, className)} {...other}>
    {children}
  </button>
);

export default Button;
