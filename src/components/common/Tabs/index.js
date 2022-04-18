import Intro from 'components/common/Tabs/IntroTab';
import TargetCreationTab from './TargetCreationTab';
import TargetProfileTab from './TargetProfileTab';

export const tabs = {
  intro: <Intro />,
  create: <TargetCreationTab />,
  profile: <TargetProfileTab />,
};

export const tabsEnum = {
  intro: 'intro',
  create: 'create',
  profile: 'profile',
};
