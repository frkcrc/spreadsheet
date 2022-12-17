import Spreadsheet from './components/Spreadsheet';
import SheetBar from './components/sheetbar/SheetBar';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>SPREADSHEET</h1>
      </div>
      <Spreadsheet />
      <SheetBar />
    </div>
  );
}

export default App;
