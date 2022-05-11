import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from 'react-toastify-redux';
import { api } from 'services/api';
import { useCreateQuestionMutation } from 'services/model/questions';
import { selectTab, setShowContactDialog } from 'state/slices/tabSlice';
import { z } from 'zod';
import smiliesSad from 'assets/smilies-sad.png';
import smilies from 'assets/smilies.png';
import Button from '../Button';
import Cross from '../Cross';
import './styles.scss';

const ContactDialog = () => {
  const { showContactDialog } = useSelector(selectTab);
  const t = useTranslation();
  const dispatch = useDispatch();
  const [createQuestion, { isError: createQuestionError, isSuccess: createQuestionSuccess }] =
    useCreateQuestionMutation();

  const onClickChild = e => e.stopPropagation();

  const schema = z.object({
    email: z
      .string()
      .email({ message: t('contact.errors.email') })
      .default(''),
    message: z
      .string()
      .min(1, { message: t('contact.errors.message') })
      .default(''),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onClose = useCallback(() => {
    dispatch(setShowContactDialog(false));
    dispatch(api.util.resetApiState());
  }, [dispatch]);

  const send = async ({ email, message }) => {
    try {
      const res = await createQuestion({ email, body: message });
      if (res.error) {
        dispatch(error(t('contact.errors.failed')));
      } else {
        dispatch(success(t('contact.success')));
      }
    } catch (err) {
      dispatch(error(t('contact.errors.failed')));
    } finally {
      reset({});
    }
  };

  const errorContent = () => (
    <>
      <img src={smiliesSad} alt="smilies" />
      <div className="m-8">
        <div className="contact-dialog__title">{t('contact.errors.title')}</div>
        <div className="description">{t('contact.errors.subtitle')}</div>
      </div>
    </>
  );

  const getFormErrorMessage = name => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  const successContent = () => (
    <>
      <img src={smilies} alt="smilies" />
      <div className="m-8">
        <div className="contact-dialog__title">{t('contact.successTitle')}</div>
        <div className="description">{t('contact.successSubtitle')}</div>
      </div>
    </>
  );

  const formContent = () => (
    <>
      <img src={smilies} alt="smilies" />
      <div className="contact-dialog__title">{t('contact.title')}</div>
      <div className="edit-profile-label">{t('contact.email').toUpperCase()}</div>
      <div className="contact-dialog__input">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <InputText
              className={classNames('w-full', { 'p-invalid': fieldState.invalid })}
              id={field.name}
              {...field}
              defaultValue=""
            />
          )}
        />
        {getFormErrorMessage('email')}
      </div>
      <div className="edit-profile-label">{t('contact.message').toUpperCase()}</div>
      <div className="contact-dialog__input">
        <Controller
          control={control}
          name="message"
          render={({ field, fieldState }) => (
            <InputTextarea
              className={classNames('w-full', { 'p-invalid': fieldState.invalid })}
              autoResize
              rows={5}
              id={field.name}
              {...field}
            />
          )}
        />
        {getFormErrorMessage('message')}
      </div>
      <Button className="contact-dialog__btn" type="button" handleClick={handleSubmit(send)}>
        <div className="edit-profile-label">{t('contact.send').toUpperCase()}</div>
      </Button>
    </>
  );

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
          {createQuestionError && errorContent()}
          {createQuestionSuccess && successContent()}
          {!createQuestionError && !createQuestionSuccess && formContent()}
        </div>
      </div>
    </>
  );
};

export default ContactDialog;
