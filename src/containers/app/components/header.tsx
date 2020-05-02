import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button';
import './header.scss';

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [renderBackBtn, shouldRenderBackBtn] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/notes') {
      shouldRenderBackBtn(true);
    } else {
      shouldRenderBackBtn(false);
    }
  }, [location]);

  const goBack = () => {
    navigate(-1);
  };

  const goToCreateForm = () => {
    navigate('notes/create');
  };

  return (
    <header className="app__header">
      <h3 className="app__header__title">Notez App</h3>
      {
        renderBackBtn ? (
          <Button
            kind="secondary"
            onClick={goBack}
          >
            Back
          </Button>
        ) : (
          <Button
            kind="secondary"
            onClick={goToCreateForm}
          >
            Create Note
          </Button>
        )
      }
    </header>
  )
};
