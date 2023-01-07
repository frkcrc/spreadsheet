import { useEffect } from 'react';
import SheetBar from './components/sheetbar/SheetBar';
import SheetPane from './components/SheetPane';
import PopupContainer from './components/popups/PopupContainer';
import KeyManager from './components/view/KeyManager';

import styles from './App.module.scss';
import { spreadsheetActions } from './store/spreadsheet';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header';

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
        <Header />
        <SheetPane />
        <SheetBar />
      </div>
      <PopupContainer />
      <KeyManager />
    </>
  );
}

export default App;
