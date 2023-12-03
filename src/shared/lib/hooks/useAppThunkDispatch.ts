import { useAppDispatch } from './useAppDispatch';
import { AppDispatch } from '../../../app/providers/StoreProvider';

export const useAppThunkDispatch: () => <Return = never>(
  ...args: Parameters<AppDispatch>
) => Promise<Return> = useAppDispatch;
