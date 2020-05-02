import React, { FunctionComponent } from 'react';
import { Note } from '../notes/notes.state';
import { useForm } from 'react-hook-form';
import { createNoteSchema as validationSchema } from '../create-note/create-note-schema';
import { Input } from '../../components/input';
import { FieldError } from '../../components/field-error';
import { Button } from '../../components/button';
import { Toast } from '../../components/toast';
import { TextArea } from '../../components/textarea';

interface Fields {
  title: string;
  content: string;
}

export const EditNoteForm: FunctionComponent<void> = () => {
  const { register, errors, handleSubmit, reset } = useForm<Fields>({ validationSchema });

  const onSubmit = (data: Fields) => {
    console.log('Note:', data);
  };

  return (
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
