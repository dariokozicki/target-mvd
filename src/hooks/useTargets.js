import { useSelector } from 'react-redux';

import { selectTargets } from 'services/model/targets';

const useTargets = () => {
  const { targets } = useSelector(selectTargets);

  return {
    targets,
  };
};

export default useTargets;
