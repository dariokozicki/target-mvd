import useTranslation from 'hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { selectTopics } from 'services/model/topics';
import { setHomeTab } from 'state/slices/tabSlice';
import { resetCreationTarget, fillCreationTarget } from 'state/slices/targetSlice';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Back from '../Back';
import { Dropdown } from 'primereact/dropdown';
import { tabsEnum } from '../Tabs';
import { Button } from 'primereact/button';
import { selectTargets } from 'services/model/targets';
import './styles.scss';

const TargetCreationTab = () => {
  const dispatch = useDispatch();
  const { topics } = useSelector(selectTopics);
  const { creation } = useSelector(selectTargets);
  const t = useTranslation();

  const onBack = () => {
    dispatch(resetCreationTarget());
    dispatch(setHomeTab(tabsEnum.intro));
  };

  const setField = (field, value) => dispatch(fillCreationTarget({ [field]: value }));

  const topicOptionTemplate = topic => {
    if (!topic) return null;
    return (
      <div className="topic-item">
        <div className="icon">
          <img src={topic.topic.icon} alt={topic.topic.label} className="img" />
        </div>
        <div>{topic.topic.label}</div>
      </div>
    );
  };

  const topicValueTemplate = (topic, props) => {
    if (!topic) {
      return <span>{props.placeholder}</span>;
    }
    return topicOptionTemplate(topic);
  };

  return (
    <>
      <div className="header">
        <Back onBack={onBack} />
        <div className="create-title">{t('creationTab.title')}</div>
      </div>
      <div className="create-target">
        <img src="./target-create-icon.png" alt="target-create-icon" />
        <div className="create-subtitle">{t('creationTab.subtitle')}</div>
        <InputNumber
          value={creation.radius || 0}
          onChange={e => setField('radius', e.value)}
          min={0}
          max={5000}
          suffix=" m"
        />
        <InputText
          value={creation.title || ''}
          onChange={e => setField('title', e.target.value)}
          placeholder={t('creationTab.targetTitleDescription')}
        />
        <Dropdown
          options={topics}
          placeholder={t('creationTab.topicDescription')}
          itemTemplate={topicOptionTemplate}
          optionLabel="label"
          value={creation.topic}
          onChange={e => setField('topic', e.target.value)}
          valueTemplate={topicValueTemplate}
        />
        <Button label="SAVE TARGET" className="p-button-secondary" />
      </div>
    </>
  );
};

export default TargetCreationTab;
