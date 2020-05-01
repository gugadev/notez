import React, { useEffect, useRef, MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { TextArea } from '../../../components/textarea';
import { createNoteSchema } from './create-note-schema';
import { FieldError } from '../../../components/field-error';
import { Toast, ToastElement } from '../../../components/toast';
import { createNote } from '../notes.actions';
import './create-note-form.scss';

type Inputs = {
  title: string;
  content: string;
};

export const CreateNoteForm = () => {
  const { register, errors, reset, handleSubmit } = useForm<Inputs>({
    validationSchema: createNoteSchema
  });
  const titleInputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
  const toastRef: MutableRefObject<ToastElement | undefined> = useRef();
  const dispatch = useDispatch();
  const { createNoteLoading, note } = useSelector((state: Record<string, any>) => state.notes);

  const onSubmit = (data: Inputs) => {
    dispatch(createNote(data));
  };

  const onNotificationClose = () => {
    reset();
    titleInputRef.current?.focus();
  }

  useEffect(() => {
    if (note) {
      const { current } = toastRef;
      current?.show();
    }
  }, [note]);

  return (
    <form className="app__createNoteContainer__createForm" onSubmit={handleSubmit(onSubmit)}>
      <article className="app__createNoteContainer__createForm__controls">
        <Input
          placeholder="The title of your note"
          ref={(el: HTMLInputElement) => {
            titleInputRef.current = el;
            register(el);
          }}
          name="title"
        />
        { errors.title?.message && <FieldError>{errors.title?.message}</FieldError> }
        <TextArea
          placeholder="Write here the contents..."
          ref={register}
          name="content"
        />
        { errors.content?.message && <FieldError>{errors.content?.message}</FieldError> }
      </article>
      <footer className="app__createNoteContainer__createForm__actions">
        <Button type="submit" kind="primary" disabled={createNoteLoading}>
          { createNoteLoading ? 'Creating note...' : 'Create note' }
        </Button>
      </footer>
      <Toast
        title="Note created"
        message="Note created successfully. Create another or go back."
        opStatus="success"
        onClose={onNotificationClose}
        ref={toastRef}
      />
    </form>
  );
};
