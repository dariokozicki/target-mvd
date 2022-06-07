import './styles.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectAuth } from 'services/auth/auth';
import { formatDate } from 'utils/dates';

const Message = ({ message: { content, date, user } }) => {
  const { user: currentUser } = useSelector(selectAuth);

  const ifSelf = (then, otherwise) => (user.id === currentUser.id ? then : otherwise);

  return (
    <li className={classNames('message', ifSelf('current-user', 'other-user'))}>
      <div className="content">{content}</div>
      <div className="time">{formatDate(date)}</div>
    </li>
  );
};

export default Message;
