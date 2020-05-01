import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { TextArea } from '../../../components/textarea';
import { createNoteSchema } from './create-note-schema';
import './create-note-form.scss';
import { FieldError } from '../../../components/field-error';
import { createNote } from '../notes.actions';

type Inputs = {
  title: string;
  content: string;
};

export const CreateNoteForm = () => {
  const { register, errors, reset, handleSubmit } = useForm<Inputs>({
    validationSchema: createNoteSchema
  });
  const dispatch = useDispatch();
  const { createNoteLoading, note } = useSelector((state: Record<string, any>) => state.notes);

  const onSubmit = (data: Inputs) => {
    console.log('Data:', data);
    dispatch(createNote(data));
  };

  useEffect(() => {
    console.log('Errors:', errors);
  }, [errors]);

  return (
    <form className="app__createNoteContainer__createForm" onSubmit={handleSubmit(onSubmit)}>
      <article className="app__createNoteContainer__createForm__controls">
        <Input
          placeholder="The title of your note"
          ref={register}
          name="title"
          // invalid={errors.title && true}
        />
        { errors.title?.message && <FieldError>{errors.title?.message}</FieldError> }
        <TextArea
          placeholder="Write here the contents..."
          ref={register}
          name="content"
          // invalid={errors.content && true}
        />
        { errors.content?.message && <FieldError>{errors.content?.message}</FieldError> }
      </article>
      <footer className="app__createNoteContainer__createForm__actions">
        <Button type="submit" kind="primary" disabled={createNoteLoading}>
          { createNoteLoading ? 'Creating note...' : 'Create note' }
        </Button>
      </footer>
    </form>
  );
};
