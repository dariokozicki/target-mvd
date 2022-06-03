import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import Back from 'components/common/Back';
import MapInputSwitch from 'components/common/MapInputSwitch';
import Message from 'components/common/Message';
import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (conversations?.matches) {
      setMatch(conversations.matches.find(m => m.match_id === conversationId) || {});
    }
  }, [conversationId, conversations]);

  useEffect(() => {
    if (dataMessages) {
      setMessages([...dataMessages.messages]);
    }
  }, [dataMessages]);

  const onBack = () => {
    dispatch(setHomeTab(tabsEnum.profile));
  };

  const handleReceivedChat = messageData => {
    setMessages(oldMessages => [...oldMessages, messageData]);
  };

  const sendMessage = ({ key }) => {
    if (key === 'Enter') {
      if (message === '') return;
      cableRef.current.perform('send_message', {
        content: message,
        match_conversation_id: conversationId,
      });
      setMessage('');
    }
  };
  console.log(messages); //TODO CHAT CONTENT
  return (
    <>
      <MapInputSwitch />
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
      />
      <div className="chat-tab">
        <div className="chat-tab__content">
          <div className="chat-tab__header">
            {match.topic_icon && (
              <img className="chat-tab__img" src={match.topic_icon} alt="topic" />
            )}
            {match.user && (
              <div className="chat-tab__username">
                {match.user.full_name || t('profile.anonymous')}
              </div>
            )}
          </div>
          <div className="chat__separator m-0" />
          <div className="chat-tab__texts-container">
            <ul className="chat-tab__texts">
              {messages.map(msg => (
                <Message message={msg} key={msg.id} />
              ))}
            </ul>
          </div>
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
