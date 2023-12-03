import OnlineStorageApi from './OnlineStorageApi';
import api from '../../../../shared/api/api';
import { IStorage } from '../types/Storage';

describe('OnlineStorageApi', () => {
  const initialStorages = [
    { id: '1', name: 'name 1', productsCount: 100 },
    { id: '2', name: 'name 2', productsCount: 200 },
    { id: '3', name: 'name 3', productsCount: 300 },
  ];
  let storages: IStorage[] = [];

  beforeEach(() => {
    storages = initialStorages;
  });

  test('getStorages', async () => {
    api.get = jest.fn(() => ({ data: storages })) as any;

    await OnlineStorageApi.getInstance()
      .getStorages()
      .then((response) => {
        expect(api.get).toBeCalledTimes(1);
        expect(response).toEqual({ data: initialStorages });
      });
  });

  test('storageAdd', async () => {
    api.post = jest.fn(() => ({ data: storages[0] })) as any;

    await OnlineStorageApi.getInstance()
      .storageAdd({ storageId: '1', count: 1 })
      .then((response) => {
        expect(api.post).toBeCalledTimes(1);
        expect(response).toEqual({ data: storages[0] });
      });
  });

  test('storageUse', async () => {
    api.post = jest.fn(() => ({ data: storages[0] })) as any;

    await OnlineStorageApi.getInstance()
      .storageUse({ storageId: '1', count: 1 })
      .then((response) => {
        expect(api.post).toBeCalledTimes(1);
        expect(response).toEqual({ data: storages[0] });
      });
  });

  test('storageMove', async () => {
    api.post = jest.fn(() => ({
      data: { source: storages[0], destination: storages[1] },
    })) as any;

    await OnlineStorageApi.getInstance()
      .storageMove({
        sourceStorageId: '1',
        destinationStorageId: '1',
        count: 1,
      })
      .then((response) => {
        expect(api.post).toBeCalledTimes(1);
        expect(response).toEqual({
          data: { source: storages[0], destination: storages[1] },
        });
      });
  });

  test('storageInventory', async () => {
    api.post = jest.fn(() => ({ data: storages[0] })) as any;

    await OnlineStorageApi.getInstance()
      .storageInventory({ storageId: '1', count: 1 })
      .then((response) => {
        expect(api.post).toBeCalledTimes(1);
        expect(response).toEqual({ data: storages[0] });
      });
  });
});

export {};
