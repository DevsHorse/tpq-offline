import { IStorage } from '../../../../entities/Storage';

export interface StoragesPageSchema {
  isLoading: boolean;
  storages: IStorage[];
  error: string | undefined;
}
