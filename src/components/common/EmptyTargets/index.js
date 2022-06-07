import useTranslation from 'hooks/useTranslation';
import footballImg from 'assets/football.png';
import travelImg from 'assets/travel.png';
import musicImg from 'assets/music.png';
import smilies from 'assets/smilies.png';

const EmptyTargets = () => {
  const t = useTranslation();

  const exampleTargets = [
    {
      label: 'profile.football',
      img: footballImg,
    },
    {
      label: 'profile.travel',
      img: travelImg,
    },
    {
      label: 'profile.music',
      img: musicImg,
    },
  ];

  return (
    <>
      <div className="my-auto w-10 contact-dialog__title">{t('profile.create')}</div>
      <div className="profile-name">{t('profile.popular')}</div>
      <div className="mb-auto">
        {exampleTargets.map(({ label, img }) => (
          <div className="profile-activity">
            <img src={img} alt={label} />
            <div>{t(label)}</div>
          </div>
        ))}
      </div>
      <img src={smilies} alt="smilies" className="smilies-small mb-5" />
    </>
  );
};

export default EmptyTargets;
