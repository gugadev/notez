import React from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import './header.scss';

export const AppHeader = () => {
  const navigate = useNavigate();

  const goToCreateForm = () => {
    navigate('notes/create');
  };
  return (
    <header className="app__header">
      <h3 className="app__header__title">Notez App</h3>
      <button className="btn btn--secondary" onClick={goToCreateForm}>Create Note</button>
    </header>
  )
};
