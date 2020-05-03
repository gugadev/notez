import React, { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
// @ts-ignore
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/button';
import { Loader } from '../../components/loader';
import { getNote, getNoteReset } from './actions';
import { timestampToDateString } from '../../lib/dates';
import { Store } from '../../lib/entities';
import { pageVariants, pageTransition } from '../../lib/animations';
import './read-note.scss';

export const ReadNoteContainer = () => {
  const { fetching, note } = useSelector((state: Store) => ({
    fetching: state.readNote.fetching,
    note: state.readNote.note
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const formattedDate = timestampToDateString(note?.date || 0);

  const goToEdit = () => {
    navigate(`/notes/edit/${id}`);
  };

  useEffect(() => {
    dispatch(getNote(id));

    return () => {
      dispatch(getNoteReset());
    }
  }, []);

  return (
    <motion.div
      style={{ position: 'absolute' }}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <article className="app__notesContainer__readNote">
        {
          fetching ? (
            <Loader show />
          ) : (
            <>
              <header className="app__notesContainer__readNote__title">
                <h2>{note?.title}</h2>
                <p>
                  <span>Created at:</span>
                  <time dateTime={formattedDate}>
                    {formattedDate}
                  </time>
                </p>
                <Button kind="primary" onClick={goToEdit}>Edit</Button>
              </header>
              <article className="app__notesContainer__readNote__content">
                <p>{ note?.content }</p>
              </article>
            </>
          )
        }
      </article>
    </motion.div>
  );
};
