import { useEffect } from 'react';
import SheetBar from './components/sheetbar/SheetBar';
import SheetPane from './components/SheetPane';
import PopupContainer from './components/popups/PopupContainer';

import styles from './App.module.scss';
import { spreadsheetActions } from './store/spreadsheet';

function App() {

  useEffect(() => {
    const cancelPopup = () => {
      spreadsheetActions.setPopup({ show: false, data: null });
    };
    document.addEventListener('pointerdown', cancelPopup);
    return _ => 
      document.removeEventListener('pointerdown', cancelPopup);
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h1>SPREADSHEET</h1>
        </div> 
        <SheetPane />
        <SheetBar />
      </div>
      <PopupContainer />
    </>
  );
}

export default App;
