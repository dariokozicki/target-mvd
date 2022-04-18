import Intro from 'components/common/Tabs/IntroTab';
import AboutTab from './AboutTab';
import TargetCreationTab from './TargetCreationTab';
import TargetProfileTab from './TargetProfileTab';

export const tabs = {
  intro: <Intro />,
  create: <TargetCreationTab />,
  profile: <TargetProfileTab />,
  about: <AboutTab />,
};

export const tabsEnum = {
  intro: 'intro',
  create: 'create',
  profile: 'profile',
  about: 'about',
};
