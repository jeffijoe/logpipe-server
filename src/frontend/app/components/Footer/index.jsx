import React from 'react';
import styles from './Footer.styl';

const Footer = () => (
  <div className={styles.container}>
    <div>
      <a target="_blank" className={styles.link} href={process.env.APP_HOMEPAGE_URL}>
        Logpipe v{process.env.APP_VERSION}
      </a>
    </div>
    <div>
      Copyright &copy; Jeff Hansen {new Date().getFullYear()}. All rights reserved.
    </div>
  </div>
);

export default Footer;