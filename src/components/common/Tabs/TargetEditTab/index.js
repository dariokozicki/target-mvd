import TopicDropdown from 'components/common/TopicDropdown';
import useTranslation from 'hooks/useTranslation';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { selectTargets } from 'services/model/targets';
import { setSelected } from 'state/slices/targetSlice';

const TargetEditTab = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { selected } = useSelector(selectTargets);

  const setField = (key, value) => dispatch(setSelected({ ...selected, [key]: value }));

  const onSave = () => {}; // TODO

  const onDelete = () => []; //TODO

  return (
    <>
      <div className="header">
        <div className="create-target">{t('edit.title')}</div>
      </div>
      <div className="create-target">
        <div className="p-fluid grid formgrid">
          <div className="centered w-100 pb-4">
            <img src="./target-create-icon.png" alt="target-create-icon" />
            <div className="create-subtitle">{t('creationTab.subtitle')}</div>
          </div>
          <div className="field col-12">
            <label htmlFor="radius" className="uppercase">
              {t('edit.length')}
            </label>
            <InputNumber
              value={selected?.radius || 0}
              onChange={e => setField('radius', e.value)}
              min={0}
              max={5000}
              suffix=" m"
              className="w-100"
            />
          </div>
          <div className="field col-12">
            <label htmlFor="title" className="uppercase">
              {t('edit.targetTitle')}
            </label>
            <InputText
              value={selected?.title || ''}
              onChange={e => setField('title', e.target.value)}
              placeholder={t('creationTab.targetTitleDescription')}
              className="w-100"
            />
          </div>
          <div className="field col-12">
            <label htmlFor="topic" className="uppercase">
              {t('edit.topic')}
            </label>
            <TopicDropdown
              onChange={e => setField('topic_id', e.target.value.topic.id)}
              topicId={selected.topic_id}
            />
          </div>
        </div>
        <div className="centered pb-3">
          <Button
            disabled={!selected?.title || !selected.topic_id || !selected.radius}
            label={t('edit.save')}
            className="p-button-secondary uppercase"
            onClick={onSave}
          />
          <Button
            label={t('edit.delete')}
            className="p-button-danger uppercase"
            onClick={onDelete}
          />
          <img src="/smilies.png" alt="smilies" className="smilies-small" />
        </div>
      </div>
    </>
  );
};

export default TargetEditTab;
