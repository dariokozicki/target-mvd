import Back from 'components/common/Back';
import useTranslation from 'hooks/useTranslation';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from 'react-toastify-redux';
import { selectTargets, useCreateTargetMutation, useGetTargetsQuery } from 'services/model/targets';
import { useGetTopicsQuery } from 'services/model/topics';
import { setHomeTab } from 'state/slices/tabSlice';
import { fillCreationTarget, resetCreationTarget } from 'state/slices/targetSlice';
import { tabsEnum } from '..';
import Loader from '../../Loader';
import './styles.scss';

const TargetCreationTab = () => {
  const dispatch = useDispatch();
  const { data: topics } = useGetTopicsQuery();
  const { creation } = useSelector(selectTargets);
  const { data: targets } = useGetTargetsQuery();
  const [createTarget, { isLoading, isSuccess, error: createError }] = useCreateTargetMutation();
  const t = useTranslation();

  const onBack = useCallback(() => {
    dispatch(resetCreationTarget());
    dispatch(setHomeTab(tabsEnum.profile));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(success(t('creationTab.success.created')));
      onBack();
    }
    if (createError) {
      dispatch(error(t('creationTab.errors.created')));
      onBack();
    }
  }, [isSuccess, createError, onBack, t, dispatch]);

  const onCreate = useCallback(() => {
    if (targets && targets.targets.length === 10) {
      dispatch(error(t('creationTab.errors.maxTargets')));
      return;
    }
    createTarget(creation);
  }, [creation, createTarget, dispatch, t, targets]);

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
      <div className="header blue">
        <Back onBack={onBack} />
        <div className="create-title">{t('creationTab.title')}</div>
      </div>
      {isLoading || createError || isSuccess ? (
        <Loader />
      ) : (
        <div className="create-target">
          <div className="p-fluid grid formgrid">
            <div className="centered w-100 pb-4">
              <img src="./target-create-icon.png" alt="target-create-icon" />
              <div className="create-subtitle">{t('creationTab.subtitle')}</div>
            </div>
            <div className="field col-12">
              <label htmlFor="radius" className="uppercase">
                {t('creationTab.length')}
              </label>
              <InputNumber
                value={creation.target.radius || 0}
                onChange={e => setField('radius', e.value)}
                min={0}
                max={5000}
                suffix=" m"
                className="w-100"
              />
            </div>
            <div className="field col-12">
              <label htmlFor="title" className="uppercase">
                {t('creationTab.targetTitle')}
              </label>
              <InputText
                value={creation.target.title || ''}
                onChange={e => setField('title', e.target.value)}
                placeholder={t('creationTab.targetTitleDescription')}
                className="w-100"
              />
            </div>
            <div className="field col-12">
              <label htmlFor="topic" className="uppercase">
                {t('creationTab.topic')}
              </label>
              <Dropdown
                options={topics?.topics}
                placeholder={t('creationTab.topicDescription')}
                itemTemplate={topicOptionTemplate}
                optionLabel="label"
                value={topics?.topics?.find(({ topic }) => topic.id === creation.target.topic_id)}
                onChange={e => setField('topic_id', e.target.value.topic.id)}
                valueTemplate={topicValueTemplate}
                className="w-100"
              />
            </div>
          </div>
          <div className="centered pb-3">
            <Button
              disabled={
                !creation?.target?.title || !creation.target.topic_id || !creation.target.radius
              }
              label={t('creationTab.save')}
              className="p-button-secondary uppercase"
              onClick={onCreate}
            />
            <img src="/smilies.png" alt="smilies" className="smilies-small" />
          </div>
        </div>
      )}
    </>
  );
};

export default TargetCreationTab;
