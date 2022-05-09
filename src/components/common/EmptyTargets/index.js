import useTranslation from 'hooks/useTranslation';

const EmptyTargets = () => {
  const t = useTranslation();

  return (
    <>
      <div className="my-auto w-10 contact-dialog__title">{t('profile.create')}</div>
      <div className="profile-name">{t('profile.popular')}</div>
      <div className="mb-auto">
        {['football', 'travel', 'music'].map(activity => (
          <div className="profile-activity">
            <img src={'./' + activity + '.png'} alt={activity} />
            <div>{t('profile.' + activity)}</div>
          </div>
        ))}
      </div>
      <img src="/smilies.png" alt="smilies" className="smilies-small mb-5" />
    </>
  );
};

export default EmptyTargets;
