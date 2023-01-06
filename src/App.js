import { useEffect } from 'react';
import SheetBar from './components/sheetbar/SheetBar';
import SheetPane from './components/SheetPane';
import PopupContainer from './components/popups/PopupContainer';
import EditingContainer from './components/editing/EditingContainer';
import KeyManager from './components/view/KeyManager';

import styles from './App.module.scss';
import { spreadsheetActions } from './store/spreadsheet';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const cancelPopup = () => {
      dispatch(spreadsheetActions.setPopup({ show: false, data: null }));      ;
    };
    document.addEventListener('pointerdown', cancelPopup);
    return _ => 
      document.removeEventListener('pointerdown', cancelPopup);
  }, [dispatch]);

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
      <EditingContainer />
      <KeyManager />
    </>
  );
}

export default App;
