import { useDispatch } from 'react-redux';
import { spreadsheetActions } from '../../store/spreadsheet';
import styles from './PopupListItem.module.scss';

const PopupListItem = props => {

  const dispatch = useDispatch();
  const { label, onClick } = props;

  // Stops the event from bubbling up so the popup won't close.
  const onPointerDownHandler = e => {
    e.stopPropagation();
  };

  // Closes the menu (since we stopped pointerdown) and calls the handler.
  const onClickHandler = e => {
    dispatch(spreadsheetActions.setPopup({ show: false, data: null }));
    onClick && onClick();
  };

  return (
    <div
      className={styles.listItem}
      onPointerDown={onPointerDownHandler}
      onClick={onClickHandler}
    >
      {label}
    </div>
  )
};
export default PopupListItem;