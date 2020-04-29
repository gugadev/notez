import React, { useEffect } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/notes');
  }, []);

  return <div />;
}