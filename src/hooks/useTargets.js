import { useSelector } from 'react-redux';

import { selectTargets } from 'services/model/targets';

const useTargets = () => {
  const { targets, creation } = useSelector(selectTargets);

  return {
    targets,
    creation,
  };
};

export default useTargets;
