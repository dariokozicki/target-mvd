import useTranslation from 'hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'services/auth/auth';
import { useGetConversationsQuery } from 'services/model/conversations';
import { DataScroller } from 'primereact/datascroller';
import './styles.scss';
import { error } from 'react-toastify-redux';
import { useCallback } from 'react';

const Chat = () => {
  const t = useTranslation();
  const { user } = useSelector(selectAuth);
  const { data: conversations } = useGetConversationsQuery(user.id);
  const matches = conversations?.matches || [];
  const dispatch = useDispatch();

  const onClickItem = useCallback(() => {
    dispatch(error(t('global.notImplemented')));
  }, [dispatch, t]);

  const itemTemplate = match => {
    return (
      <>
        <div
          className="chat__item w-full"
          onClick={onClickItem}
          onKeyDown={onClickItem}
          role="button"
          tabIndex={0}
        >
          <img
            className="chat__image"
            src={match.user.avatar.small_thumb_url || './default-profile.png'}
            alt={match.user.full_name + "'s Picture"}
          />
          <div className="chat__text">
            <div className="chat__title">{match.user.full_name || t('profile.anonymous')}</div>
            <div>{match.last_message || t('profile.noMessages')}</div>
          </div>
          <img className="chat__image" src={match.topic_icon} alt="topic" />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full h-full centered">
        <div className="chat mt-auto">
          <DataScroller
            value={matches}
            itemTemplate={itemTemplate}
            inline
            scrollHeight="270px"
            header={t('profile.chat')}
            rows={matches.length}
            buffer={0.4}
          />
        </div>
        <img src="/smilies.png" alt="smilies" className="smilies-small mb-5 mt-auto" />
      </div>
    </>
  );
};

export default Chat;