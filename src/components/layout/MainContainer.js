import Header from './Header';
import Footer from './Footer';
import SheetContainer from '../sheet/SheetContainer';

import styles from './MainContainer.module.css';

const MainContainer = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <SheetContainer />
      <Footer />
    </div>
  );
};

export default MainContainer;