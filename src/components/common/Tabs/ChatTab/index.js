import Back from 'components/common/Back';
import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { useDispatch, useSelector } from 'react-redux';
import { useGetConversationsQuery, useGetMessagesQuery } from 'services/model/conversations';
import { selectTargets } from 'services/model/targets';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import './styles.scss';

const ChatTab = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const cableRef = useRef(null);
  const { conversationSelected: conversationId } = useSelector(selectTargets);
  const { data: conversations } = useGetConversationsQuery();
  const [match, setMatch] = useState({});
  const { data: dataMessages } = useGetMessagesQuery({ conversationId });
  const messages = dataMessages?.messages || [];
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (conversations?.matches) {
      setMatch(conversations.matches.find(m => m.match_id === conversationId) || {});
    }
  }, [conversationId, conversations]);

  const onBack = () => {
    dispatch(setHomeTab(tabsEnum.profile));
  };

  const handleReceivedChat = data => {
    console.log('recibi un mensaje', data);
  };

  const sendMessage = ({ key }) => {
    if (key === 'Enter') {
      if (message === '') return;
      cableRef.current.perform('send_message', {
        message,
      });
      setMessage('');
    }
  };

  return (
    <>
      <div className="header blue">
        <Back onBack={onBack} />
        <div className="create-title">{t('profile.chat')}</div>
      </div>
      <ActionCableConsumer
        ref={cableRef}
        channel={{
          channel: 'ChatChannel',
          match_conversation_id: conversationId,
        }}
        key={conversationId}
        onReceived={handleReceivedChat}
        onConnect={() => console.log('llegue a conectarme!')}
        onRejected={() => console.log('fui rechazado')}
      />
      <div className="chat-tab">
        <div className="chat-tab__header">
          {match.topic_icon && <img className="chat-tab__img" src={match.topic_icon} alt="topic" />}
          {match.user?.full_name && (
            <div className="chat-tab__username">{match.user.full_name}</div>
          )}
        </div>
        <div className="chat__separator m-0" />
        <div className="chat-tab__texts">
          {messages.map(msg => (
            <label>{msg.content}</label>
          ))}
        </div>
        <div className="chat-tab__input">
          <InputText
            placeholder={t('chat.placeholder')}
            value={message}
            onKeyPress={sendMessage}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ChatTab;
