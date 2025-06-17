import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiKey } from './app/authSlice';

export default function App({ children }) {
  const dispatch = useDispatch();
  const { apiKey, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchApiKey());
    }
  }, [status, dispatch]);
    
  if (status === 'loading') return <div>Laddar API-nyckel...</div>;
  if (status === 'failed') return <div>Ett fel uppstod vid hämtning av API-nyckel: {error}</div>;
  
  return <>{children}</>;
  
}
