import './styles.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectAuth } from 'services/auth/auth';

const Message = ({ message: { content, date, user } }) => {
  const { user: currentUser } = useSelector(selectAuth);

  const ifSelf = (then, otherwise) => (user.id === currentUser.id ? then : otherwise);

  const formatDate = date => {
    const theDate = new Date(date);
    return `${theDate.getHours() % 12}.${String(theDate.getMinutes()).padStart(2, '0')} ${
      theDate.getHours() >= 12 ? 'PM' : 'AM'
    }`;
  };

  return (
    <li className={classNames('message', ifSelf('current-user', 'other-user'))}>
      <div className="content">{content}</div>
      <div className="time">{formatDate(date)}</div>
    </li>
  );
};

export default Message;
