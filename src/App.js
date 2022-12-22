import SheetBar from './components/sheetbar/SheetBar';
import SheetView from './components/view/SheetView';
import Scrollbar from './components/view/Scrollbar';
import Spacer from './components/utils/Spacer';
import { defaultHeight, rowHeadWidth, scrollbarThickness } from './helpers/constants';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>SPREADSHEET</h1>
      </div>
      
      <div className={styles.sheetArea}>

        <div className={styles.middleContent}>

          <div className={styles.view}>
            <SheetView />
          </div>

          <div className={styles.vBar}>
            <Spacer width={scrollbarThickness} height={defaultHeight} />
            <Scrollbar axis="y" view={0.5} />
          </div>

        </div>

        <div className={styles.lowerContent}>
          <Spacer width={rowHeadWidth} height={scrollbarThickness} nb />
          <Scrollbar axis="x" view={0.2} />
          <Spacer width={scrollbarThickness} height={defaultHeight} nb />
        </div>
        
      </div>

      <SheetBar />
    </div>
  );
}

export default App;
