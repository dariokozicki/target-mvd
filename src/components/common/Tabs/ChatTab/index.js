import Back from 'components/common/Back';
import Button from 'components/common/Button';
import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessagesQuery } from 'services/model/conversations';
import { selectTargets } from 'services/model/targets';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import './styles.scss';

const ChatTab = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const cableRef = useRef(null);
  const { conversationSelected: conversationId } = useSelector(selectTargets);
  const { data: dataMessages } = useGetMessagesQuery({ conversationId });
  const messages = dataMessages?.messages || [];
  const [message, setMessage] = useState('');

  const onBack = () => {
    dispatch(setHomeTab(tabsEnum.profile));
  };

  const handleReceivedChat = data => {
    console.log('recibi un mensaje', data);
  };

  const sendMessage = () => {
    if (message === '') return;
    cableRef.current.perform('send_message', {
      message,
    });
    setMessage('');
  };

  return (
    <>
      <div className="header blue">
        <Back onBack={onBack} />
        <div className="create-title">{t('creationTab.title')}</div>
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
      {messages.map(msg => (
        <label>{msg.content}</label>
      ))}
      <InputText value={message} onChange={e => setMessage(e.target.value)} />
      <Button handleClick={sendMessage}></Button>
    </>
  );
};

export default ChatTab;
