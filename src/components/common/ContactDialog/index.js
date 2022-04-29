import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab, setShowContactDialog } from 'state/slices/tabSlice';
import Cross from '../Cross';
import { InputTextarea } from 'primereact/inputtextarea';
import Button from '../Button';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';

const ContactDialog = () => {
  const { showContactDialog } = useSelector(selectTab);
  const t = useTranslation();
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(setShowContactDialog(false));
  }, [dispatch]);

  const onClickChild = e => e.stopPropagation();

  const schema = z.object({
    email: z.string().email({ message: t('login.errors.emailMsg') }),
    message: z.string().min(1, { message: t('login.errors.passwordMsg') }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const send = data => {};

  const getFormErrorMessage = name => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  if (!showContactDialog) return null;

  return (
    <>
      <div
        className="contact-dialog"
        onClick={onClose}
        onKeyDown={onClose}
        role="button"
        tabIndex={-2}
      >
        <div
          className="contact-dialog__content"
          onClick={onClickChild}
          role="button"
          tabIndex={-2}
          onKeyDown={onClickChild}
        >
          <div className="contact-dialog__close">
            <Cross onClick={onClose} />
          </div>
          <img src="/smilies.png" alt="smilies" />
          <div className="contact-dialog__title">{t('contact.title')}</div>
          <div className="edit-profile-label">{t('contact.email').toUpperCase()}</div>
          <div className="contact-dialog__input">
            <Controller
              control={control}
              name="email"
              render={({ field }) => <InputText className="w-full" {...field} />}
            />
            {getFormErrorMessage('email')}
          </div>
          <div className="edit-profile-label">{t('contact.message').toUpperCase()}</div>
          <div className="contact-dialog__input">
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <InputTextarea className="w-full" autoResize rows={5} {...field} />
              )}
            />
            {getFormErrorMessage('message')}
          </div>
          <Button className="contact-dialog__btn" onClick={handleSubmit(send)}>
            <div className="edit-profile-label">{t('contact.send').toUpperCase()}</div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContactDialog;
