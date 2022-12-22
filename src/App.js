import SheetBar from './components/sheetbar/SheetBar';
import SheetPane from './components/SheetPane';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>SPREADSHEET</h1>
      </div>
      
      <SheetPane />

      <SheetBar />
    </div>
  );
}

export default App;
