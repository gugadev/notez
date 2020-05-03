import React from 'react';
import { motion } from 'framer-motion';
import { CreateNoteForm } from './components/create-note-form';
import { pageVariants, pageTransition } from '../../lib/animations';
import './create-note.scss';

export const CreateNoteContainer = () => (
  <motion.div
    style={{ position: 'absolute' }}
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
  <article className="app__createNoteContainer">
    <header className="app__createNoteContainer__title">
      <h2>Create Note</h2>
    </header>
    <CreateNoteForm />
  </article>
  </motion.div>
);
