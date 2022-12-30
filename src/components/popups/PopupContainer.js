import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { scrollbarThickness } from '../../helpers/constants';
import CellPopup from './CellPopup';
import ColPopup from './ColPopup';
import styles from './PopupContainer.module.scss';
import RowPopup from './RowPopup';

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

  // Setup CSS classes.
  const classList = [styles.popup];
  if (show) { classList.push(styles.active); }
  
  // Setup content and styles.
  const popupStyle = {};
  let popupContent = false;
  if (show) {
    popupStyle.left = data.anchor.x + offsets.x;
    popupStyle.top = data.anchor.y + offsets.y;

    switch (data.type) {
      case 'cell':
        popupContent = <CellPopup payload={data.payload} />; break;
      case 'row':
        popupContent = <RowPopup payload={data.payload} />; break;
      case 'col':
        popupContent = <ColPopup payload={data.payload} />; break;
      default: break;
    }
  }

  // 

  return (
    <div className={styles.popupContainer}>
      <div
        className={classList.join(' ')}
        style={popupStyle}
        ref={innerRef}
      >
        {popupContent}
      </div>
    </div>
  );
};
export default PopupContainer;