import Spreadsheet from './components/Spreadsheet';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>App Header Area</h1>
      </div>
      <Spreadsheet />
      <div className={styles.footer}>
        Footer - Sheets Buttons...
      </div>
    </div>
  );
}

export default App;
