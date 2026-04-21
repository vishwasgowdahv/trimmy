import { useContext } from 'react';
import UrlContext from '../contexts/UrlContext';

export function useUrls() {
  const context = useContext(UrlContext);
  if (!context) throw new Error('useUrls must be used within UrlProvider');
  return context;
}