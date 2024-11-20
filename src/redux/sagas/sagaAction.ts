import {setIsLoading} from '../authSlice';

export const setLoading = (payload: boolean) => {
  return {
    type: setIsLoading.type,
    action: payload,
  };
};
