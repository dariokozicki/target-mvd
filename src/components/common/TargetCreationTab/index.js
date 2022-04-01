import useTranslation from 'hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTopicsQuery } from 'services/model/topics';
import { setHomeTab } from 'state/slices/tabSlice';
import { resetCreationTarget, fillCreationTarget } from 'state/slices/targetSlice';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Back from '../Back';
import { Dropdown } from 'primereact/dropdown';
import { tabsEnum } from '../Tabs';
import { Button } from 'primereact/button';
import { selectTargets, useCreateTargetMutation } from 'services/model/targets';
import './styles.scss';
import Loader from '../Loader';

const TargetCreationTab = () => {
  const dispatch = useDispatch();
  const { data: topics } = useGetTopicsQuery();
  const { creation } = useSelector(selectTargets);
  const [createTarget, { isLoading, isSuccess, error }] = useCreateTargetMutation();
  const t = useTranslation();

  const onBack = () => {
    dispatch(resetCreationTarget());
    dispatch(setHomeTab(tabsEnum.intro));
  };

  const onCreate = () => {
    createTarget(creation);
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
      {isLoading || isSuccess || error ? (
        <Loader isLoading={isLoading} isSuccess={isSuccess} error={error} />
      ) : (
        <div className="create-target">
          <img src="./target-create-icon.png" alt="target-create-icon" />
          <div className="create-subtitle">{t('creationTab.subtitle')}</div>
          <InputNumber
            value={creation.target.radius || 0}
            onChange={e => setField('radius', e.value)}
            min={0}
            max={5000}
            suffix=" m"
          />
          <InputText
            value={creation.target.title || ''}
            onChange={e => setField('title', e.target.value)}
            placeholder={t('creationTab.targetTitleDescription')}
          />
          <Dropdown
            options={topics.topics}
            placeholder={t('creationTab.topicDescription')}
            itemTemplate={topicOptionTemplate}
            optionLabel="label"
            value={topics.topics.find(({ topic }) => topic.id === creation.target.topic_id)}
            onChange={e => setField('topic_id', e.target.value.topic.id)}
            valueTemplate={topicValueTemplate}
          />
          <Button label={t('creationTab.save')} className="p-button-secondary" onClick={onCreate} />
        </div>
      )}
    </>
  );
};

export default TargetCreationTab;
