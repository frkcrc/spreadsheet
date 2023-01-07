import styles from './Header.module.scss';

const Header = () => {

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>SPREADSHEET DEMO</h1>
      </div>
      <div className={styles.ribbon}>
        <a href="https://github.com/frkcrc/spreadsheet" target="_blank" rel="noreferrer">
          <img 
            decoding="async"
            loading="lazy"
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149"
            alt="Fork me on GitHub"
            data-recalc-dims="1"
          />
        </a>
      </div>
    </div> 
  )
};

export default Header;