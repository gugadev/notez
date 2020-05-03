import React, { FunctionComponent, MutableRefObject, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { FieldError } from '../../../components/field-error';
import { Button } from '../../../components/button';
import { Toast, ToastElement } from '../../../components/toast';
import { TextArea } from '../../../components/textarea';
import { createNoteSchema as validationSchema } from '../../create-note/create-note-schema';
import { updateNoteFetch, updateNoteReset, updateNote } from '../actions';
import { Loader } from '../../../components/loader';
import { Store } from '../../../lib/entities';
import './edit-note-form.scss';

interface Fields {
  title: string;
  content: string;
}

export const EditNoteForm: FunctionComponent = () => {
  const { fetching, sending, note, updatedNote } = useSelector((state: Store) => ({
    fetching: state.editNote.fetching,
    sending: state.editNote.sending,
    note: state.editNote.note,
    updatedNote: state.editNote.updatedNote
  }))

  const { register, errors, handleSubmit, setValue } = useForm<Fields>({
    validationSchema
  });
  const { id } = useParams();
  // ref for toast notification. Here you have show method.
  const toastRef: MutableRefObject<ToastElement | undefined> = useRef();
  const dispatch = useDispatch();

  const onSubmit = (data: Fields) => {
    const payload = {
      ...data,
      uid: note?.uid,
      date: note?.date
    };
    dispatch(updateNote(payload));
  };

  useEffect(() => {
    dispatch(updateNoteFetch(id));
    return () => {
      dispatch(updateNoteReset());
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setValue('title', note?.title || '', true);
      setValue('content', note?.content || '', true);
    });
  }, [note]);

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
      <article className="app__createNoteContainer__editForm__controls">
        <Input
          name="title"
          placeholder="The title of your note"
          ref={register}
        />
        { errors.title?.message && <FieldError>{errors.title?.message}</FieldError> }
        <TextArea
          name="content"
          placeholder="Write here the contents..."
          ref={register}
        />
        { errors.content?.message && <FieldError>{errors.content?.message}</FieldError> }
      </article>
      <footer className="app__createNoteContainer__editForm__actions">
        <Button type="submit" kind="primary" disabled={sending}>
          { sending ? 'Saving note...' : 'Save note' }
        </Button>
      </footer>
      <Toast
        title="Note updated"
        message="Note updated successfully. Create another or go back."
        opStatus="success"
        ref={toastRef}
      />
    </form>
  );
};
