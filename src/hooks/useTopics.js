import { useSelector } from 'react-redux';

import { selectTopics } from 'services/model/topics';

const useTopics = () => {
  const { topics } = useSelector(selectTopics);

  return {
    topics,
  };
};

export default useTopics;
