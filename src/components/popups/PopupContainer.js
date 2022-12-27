import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { scrollbarThickness } from '../../helpers/constants';
import styles from './PopupContainer.module.scss';

const PopupContainer = () => {

  const innerRef = useRef();
  const [offsets, setOffsets] = useState({x: 0, y: 0});
  const popup = useSelector(state => state.spreadsheet.popup);
  const {show, data} = popup;

  // Effect to define popup positioning around the anchor.
  useLayoutEffect(() => {
    if (show) {
      const width = innerRef.current.clientWidth;
      const height = innerRef.current.clientHeight;
      // By default the popup is shown to the bottom-right.
      // Only if there is no space that gets flipped.
      const spaceRight = 
        window.innerWidth - (data.anchor.x + width + scrollbarThickness);
      const spaceBelow =
        window.innerHeight - (data.anchor.y + height);
      setOffsets({
        x: (spaceRight < 0 ? -width : 0),
        y : (spaceBelow < 0 ? -height : 0),
      });
    }
  }, [show, data, innerRef]);
  
  // Setup styles.
  const popupStyle = {};
  if (show) {
    popupStyle.left = data?.anchor.x + offsets.x;
    popupStyle.top = data?.anchor.y + offsets.y;
  }

  return (
    <div className={styles.popupContainer}>
      <div
        className={show ? styles.popupActive : styles.popup}
        style={popupStyle}
        ref={innerRef}
      >
        Test popup.
      </div>
    </div>
  );
};
export default PopupContainer;