import styles from './MainContainer.module.css';
import Header from './Header';
import Footer from './Footer';
import SheetHeader from '../sheet/SheetHeader';
import SheetContainer from '../sheet/SheetContainer';
import SheetFooter from '../sheet/SheetFooter';

const MainContainer = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <SheetHeader />
      <SheetContainer />
      <SheetFooter />
      <Footer />
    </div>
  );
};

export default MainContainer;