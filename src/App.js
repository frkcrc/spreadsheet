import Spreadsheet from './components/Spreadsheet';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>SPREADSHEET</h1>
      </div>
      <Spreadsheet />
      <div className={styles.footer}>
        
      </div>
    </div>
  );
}

export default App;
