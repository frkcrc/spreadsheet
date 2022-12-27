import styles from './PopupList.module.scss';

const PopupList = props => {
  return (
    <div className={styles.listContainer}>
      {props.children}
    </div>
  )
};
export default PopupList;