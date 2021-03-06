import React, { useEffect, useRef, MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { TextArea } from '../../../components/textarea';
import { createNoteSchema as validationSchema } from '../create-note-schema';
import { FieldError } from '../../../components/field-error';
import { Toast, ToastElement } from '../../../components/toast';
import { createNote, createNoteReset } from '../actions';
import { Store } from '../../../lib/entities';
import './create-note-form.scss';

type Inputs = {
  title: string;
  content: string;
};

export const CreateNoteForm = () => {
  const { sending, createdNote } = useSelector((state: Store) => ({
    sending: state.createNote.sending,
    createdNote: state.createNote.createdNote
  }));
  const { register, errors, reset, handleSubmit } = useForm<Inputs>({ validationSchema });
  // ref for the title input to force focus after close toast notification
  const titleInputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
  // ref for toast notification. Here you have show method.
  const toastRef: MutableRefObject<ToastElement | undefined> = useRef();
  const dispatch = useDispatch();

  const onSubmit = (data: Inputs) => {
    dispatch(createNote(data));
  };

  const onNotificationClose = () => {
    reset();
    titleInputRef.current?.focus();
  };

  useEffect(() => {
    return () => {
      dispatch(createNoteReset());
    };
  }, []);

  useEffect(() => {
    if (createdNote) {
      const { current } = toastRef;
      current?.show();
    }
  }, [createdNote]);

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
        <Button type="submit" kind="primary" disabled={sending}>
          { sending ? 'Creating note...' : 'Create note' }
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
