import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch } from 'react-redux';
import { setHomeTab } from 'state/slices/tabSlice';
import { Button } from 'primereact/button';
import './styles.scss';
import { tabsEnum } from '../Tabs';

const Loader = ({ isLoading, isSuccess, error }) => {
  const dispatch = useDispatch();

  if (isLoading) {
    <div className="centered">
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      <div>Loading...</div>
    </div>;
  }

  return (
    <div className="centered">
      {isSuccess && <div>Success!</div>}
      {error && <div>error</div>}
      <Button label="Okay" onClick={() => dispatch(setHomeTab(tabsEnum.intro))} />
    </div>
  );
};

export default Loader;
