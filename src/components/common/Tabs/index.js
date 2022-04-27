import Intro from 'components/common/Tabs/IntroTab';
import AboutTab from './AboutTab';
import EditProfileTab from './EditProfileTab';
import TargetCreationTab from './TargetCreationTab';
import TargetEditTab from './TargetEditTab';
import TargetProfileTab from './TargetProfileTab';

export const tabs = {
  intro: <Intro />,
  create: <TargetCreationTab />,
  profile: <TargetProfileTab />,
  about: <AboutTab />,
  editTarget: <TargetEditTab />,
  editProfile: <EditProfileTab />,
};

export const tabsEnum = {
  intro: 'intro',
  create: 'create',
  profile: 'profile',
  about: 'about',
  editTarget: 'editTarget',
  editProfile: 'editProfile',
};
