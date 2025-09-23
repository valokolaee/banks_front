// src/components/TestAPI.tsx
import { useEffect } from 'react';
import axios from 'axios';

const TestAPI = () => {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await axios.get('/api/banks');
        console.log('API Response:', res.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };
    testConnection();
  }, []);

  return <div>Checking API connection...</div>;
};

export default TestAPI;