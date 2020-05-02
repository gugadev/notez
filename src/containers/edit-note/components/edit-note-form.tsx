import React, { FunctionComponent, MutableRefObject, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { FieldError } from '../../../components/field-error';
import { Button } from '../../../components/button';
import { Toast, ToastElement } from '../../../components/toast';
import { TextArea } from '../../../components/textarea';
import { createNoteSchema as validationSchema } from '../../create-note/create-note-schema';
import { updateNoteFetch, updateNoteReset } from '../actions';
import { Loader } from '../../../components/loader';
import { Store } from '../../../lib/entities';

interface Fields {
  title: string;
  content: string;
}

export const EditNoteForm: FunctionComponent<void> = () => {
  const { fetching, sending, note, updatedNote } = useSelector((state: Store) => ({
    fetching: state.editNote.fetching,
    sending: state.editNote.sending,
    note: state.editNote.note,
    updatedNote: state.editNote.updatedNote
  }))
  const { register, errors, handleSubmit, reset } = useForm<Fields>({
    validationSchema,
    defaultValues: {
      title: note?.title,
      content: note?.content
    }
  });
  // ref for the title input to force focus after close toast notification
  const titleInputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
  // ref for toast notification. Here you have show method.
  const toastRef: MutableRefObject<ToastElement | undefined> = useRef();
  const dispatch = useDispatch();

  const onSubmit = (data: Fields) => {
    console.log('Note:', data);
  };

  const onNotificationClose = () => {
    reset();
    titleInputRef.current?.focus();
  }

  useEffect(() => {
    dispatch(updateNoteFetch());
    return () => {
      dispatch(updateNoteReset());
    };
  }, []);

  useEffect(() => {
    if (updatedNote) {
      const { current } = toastRef;
      current?.show();
    }
  }, [updatedNote]);

  return fetching ? (
    <Loader show />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="app__editNoteContainer__form">
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
        title="Note updated"
        message="Note updated successfully. Create another or go back."
        opStatus="success"
        onClose={onNotificationClose}
        ref={toastRef}
      />
    </form>
  );
};
