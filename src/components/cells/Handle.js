import styles from './Handle.module.scss';

const Handle = props => {

  const type = props.type;

  const className = styles[`handle${type}`];

  return (
    <div className={className}></div>
  );
};
export default Handle;