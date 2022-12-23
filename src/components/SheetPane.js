import { useDispatch } from "react-redux";
import Spacer from "./utils/Spacer";
import Scrollbar from "./view/Scrollbar";
import SheetView from "./view/SheetView";
import { defaultHeight, rowHeadWidth, scrollbarThickness } from '../helpers/constants';

import { spreadsheetActions } from "../store/spreadsheet";
import styles from './SheetPane.module.scss';

const SheetPane = () => {

  const dispatch = useDispatch();
  const onWheelHandler = e => {
    dispatch(spreadsheetActions.scroll({
      axis: 'rows',
      delta: (e.deltaY > 0 ? +1 : -1) 
    }));
  };

  return (
    <div className={styles.sheetArea} onWheel={onWheelHandler}>
      <div className={styles.middleContent}>
        <div className={styles.view}>
          <SheetView />
        </div>
        <div className={styles.vBar}>
          <Spacer width={scrollbarThickness} height={defaultHeight} />
          <Scrollbar axis="rows" />
        </div>
      </div>
      <div className={styles.lowerContent}>
        <Spacer width={rowHeadWidth} height={scrollbarThickness} nb />
        <Scrollbar axis="cols" />
        <Spacer width={scrollbarThickness} height={defaultHeight} nb />
      </div>
    </div>
  );
};

export default SheetPane;