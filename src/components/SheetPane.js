import Spacer from "./utils/Spacer";
import Scrollbar from "./view/Scrollbar";
import SheetView from "./view/SheetView";
import { defaultHeight, rowHeadWidth, scrollbarThickness } from '../helpers/constants';

import styles from './SheetPane.module.scss';

const SheetPane = () => {

  return (
    <div className={styles.sheetArea}>
      <div className={styles.middleContent}>
        <div className={styles.view}>
          <SheetView />
        </div>
        <div className={styles.vBar}>
          <Spacer width={scrollbarThickness} height={defaultHeight} />
          <Scrollbar axis="y" />
        </div>
      </div>
      <div className={styles.lowerContent}>
        <Spacer width={rowHeadWidth} height={scrollbarThickness} nb />
        <Scrollbar axis="x" />
        <Spacer width={scrollbarThickness} height={defaultHeight} nb />
      </div>
    </div>
  );
};

export default SheetPane;