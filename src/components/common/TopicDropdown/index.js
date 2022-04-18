import useTranslation from 'hooks/useTranslation';
import { Dropdown } from 'primereact/dropdown';
import { useGetTopicsQuery } from 'services/model/topics';

const TopicDropdown = ({ onChange, topicId }) => {
  const t = useTranslation();
  const { data: topics } = useGetTopicsQuery();

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
    <Dropdown
      options={topics?.topics}
      placeholder={t('creationTab.topicDescription')}
      itemTemplate={topicOptionTemplate}
      optionLabel="label"
      value={topics?.topics?.find(({ topic }) => topic.id === topicId)}
      onChange={onChange}
      valueTemplate={topicValueTemplate}
      className="w-100"
    />
  );
};

export default TopicDropdown;
