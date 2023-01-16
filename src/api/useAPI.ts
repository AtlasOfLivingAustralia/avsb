import { useContext } from 'react';
import APIContext from './APIContext';

function useAPI() {
  return useContext(APIContext);
}

export default useAPI;
