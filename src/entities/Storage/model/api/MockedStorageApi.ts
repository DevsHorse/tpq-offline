import {IStorage} from "../types/Storage";

let storages = [
  {
    id: "dGhpcyBpcyBwYW0KCg",
    name: "Reception Area",
    productsCount: 1000
  },
  {
    id: "YmVzdCBib3NzCgoK",
    name: "Regional Manager's Office",
    productsCount: 1000
  },
  {
    id: "ZHVuZGVyIG1pZmZsaW4K",
    name: "Warehouse",
    productsCount: 1000
  }
];

class MockedStorageApi {
  private mutateStorage = (storageIndex: number, cb: (storage: IStorage) => IStorage) => {
    const newStorages = [...storages];
    let newStorage = {...newStorages[storageIndex]};
    newStorage = cb({...newStorage});
    newStorages.splice(storageIndex, 1, newStorage);
    storages = newStorages;
    return {...newStorage};
  }

  private mockedDelay(cb: (res: any, rej: any) => void): Promise<{data: any}> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        cb(res, rej)
      }, 500);
    });
  }

  async getStorages() {
    return this.mockedDelay((res, rej) => {
      res({data: storages})
    })
  }

  async storageAdd(data: {
    storageId: string;
    count: number;
  }) {
    return this.mockedDelay((res, rej) => {
      const storageIndex = storages.findIndex(s => s.id === data.storageId);
      if (storageIndex !== -1) {
        const newStorage = this.mutateStorage(storageIndex, (s) => {
          s.productsCount += data.count;
          return s;
        })
        res({data: newStorage});
      } else {
        rej('incorrect storage');
      }
    });
  }

  async storageUse(data: {
    storageId: string;
    count: number;
  }) {
    return this.mockedDelay((res, rej) => {
      const storageIndex = storages.findIndex(s => s.id === data.storageId);
      if (storageIndex !== -1) {
        const newStorage = this.mutateStorage(storageIndex, (s) => {
          s.productsCount -= data.count;
          return s;
        })
        res({data: newStorage});
      } else {
        rej('incorrect storage');
      }
    });
  }

  async storageMove(data: {
    sourceStorageId: string,
    destinationStorageId: string,
    count: number
  }) {
    return this.mockedDelay((res, rej) => {
      const storageIndex1 = storages.findIndex(s => s.id === data.sourceStorageId);
      const storageIndex2 = storages.findIndex(s => s.id === data.destinationStorageId);
      if (storageIndex1 !== -1 && storageIndex2 !== -1) {
        const newStorage1 = this.mutateStorage(storageIndex1, (s) => {
          s.productsCount -= data.count;
          return s;
        })
        const newStorage2 = this.mutateStorage(storageIndex2, (s) => {
          s.productsCount += data.count;
          return s;
        })
        res({data: {source: newStorage1, destination: newStorage2}});
      } else {
        rej('incorrect storage');
      }
    });
  }

  async storageInventory(data: {
    storageId: string;
    count: number;
  }) {
    return this.mockedDelay((res, rej) => {
      const storageIndex = storages.findIndex(s => s.id === data.storageId);
      if (storageIndex !== -1) {
        const newStorage = this.mutateStorage(storageIndex, (s) => {
          s.productsCount = data.count;
          return s;
        })
        res({data: [newStorage]});
      } else {
        rej('incorrect storage');
      }
    });
  }
}

export default MockedStorageApi;