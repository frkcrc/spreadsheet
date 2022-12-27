import styles from './PopupList.module.scss';
import PopupListItem from './PopupListItem';

const PopupList = props => {
  return (
    <div className={styles.listContainer}>
      {props.children}
    </div>
  )
};
export default PopupList;