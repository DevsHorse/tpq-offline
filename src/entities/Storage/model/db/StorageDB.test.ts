import StorageDB from './StorageDB';
import {UpdateStorageType} from '../types/UpdateStorageType';
import {StorageDBKeys} from '../types/StorageDBKeys';

describe('StorageDB', () => {
	const initialStorages = [
		{id: '1', name: 'name 1', productsCount: 100},
		{id: '2', name: 'name 2', productsCount: 200},
		{id: '3', name: 'name 3', productsCount: 300}
	];

	const storage: {[key in StorageDBKeys]: any[]} = {
		[StorageDBKeys.STORAGES]: [],
		[StorageDBKeys.ACTIONS]: []
	};

	beforeEach(() => {
		storage[StorageDBKeys.STORAGES] = initialStorages;
		storage[StorageDBKeys.ACTIONS] = [];
		jest.spyOn(Storage.prototype, 'getItem');
		jest.spyOn(Storage.prototype, 'setItem');
		jest.spyOn(Date.prototype, 'getTime');
		Storage.prototype.getItem = jest.fn((key: StorageDBKeys) => JSON.stringify(storage[key]));
		Storage.prototype.setItem = jest.fn((key: StorageDBKeys, value: string) => {
			storage[key] = JSON.parse(value);
		});
		let count = 100;
		Date.prototype.getTime = jest.fn(() => {
			return ++count;
		});
	});

	test('init', () => {
		new StorageDB();
		expect(localStorage.getItem).toBeCalledTimes(2);
		expect(localStorage.setItem).toBeCalledTimes(0);
	});

	test('init first time', () => {
		storage[StorageDBKeys.STORAGES] = undefined as any;
		storage[StorageDBKeys.ACTIONS] = undefined as any;
		new StorageDB();
		expect(localStorage.getItem).toBeCalledTimes(2);
		expect(localStorage.setItem).toBeCalledTimes(2);
	});

	test('setStorages', () => {
		const newStorages = [{id: 'id', name: 'name', productsCount: 20}];
		new StorageDB().setStorages([{id: 'id', name: 'name', productsCount: 20}]);
		expect(localStorage.setItem).toBeCalledTimes(1);
		expect(storage[StorageDBKeys.STORAGES]).toEqual(newStorages);
	});

	test('setStorages without value', () => {
		new StorageDB().setStorages(undefined as any);
		expect(localStorage.setItem).toBeCalledTimes(0);
	});

	test('getStorages', () => {
		const storages = new StorageDB().getStorages();
		expect(localStorage.getItem).toBeCalledTimes(3);
		expect(storages).toEqual(initialStorages);
	});

	test('updateStorage type: add', async () => {
		const newStorage = await new StorageDB().updateStorage({
			data: {
				storageId: '1',
				count: 10,
			},
			type: UpdateStorageType.ADD
		});

		const expectedStorage = {id: '1', name: 'name 1', productsCount: 110};
		expect(newStorage).toEqual(expectedStorage);
		expect(storage[StorageDBKeys.STORAGES][0]).toEqual(expectedStorage);
		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
				},
				type: UpdateStorageType.ADD
			}
		]);
	});

	test('updateStorage type: use', async () => {
		const newStorage = await new StorageDB().updateStorage({
			data: {
				storageId: '1',
				count: 10,
			},
			type: UpdateStorageType.USE
		});

		const expectedStorage = {id: '1', name: 'name 1', productsCount: 90};
		expect(newStorage).toEqual(expectedStorage);
		expect(storage[StorageDBKeys.STORAGES][0]).toEqual(expectedStorage);
		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
				},
				type: UpdateStorageType.USE
			}
		]);
	});

	test('updateStorage type: inventory', async () => {
		const newStorage = await new StorageDB().updateStorage({
			data: {
				storageId: '1',
				count: 10,
			},
			type: UpdateStorageType.INVENTORY
		});

		const expectedStorage = {id: '1', name: 'name 1', productsCount: 10};
		expect(newStorage).toEqual(expectedStorage);
		expect(storage[StorageDBKeys.STORAGES][0]).toEqual(expectedStorage);
		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
				},
				type: UpdateStorageType.INVENTORY
			}
		]);
	});

	test('updateStorage type: move', async () => {
		const newStorage = await new StorageDB().updateStorage({
			data: {
				sourceStorageId: '1',
				destinationStorageId: '2',
				count: 10,
			},
			type: UpdateStorageType.MOVE
		});

		const expectedSourceStorage = {id: '1', name: 'name 1', productsCount: 90};
		const expectedDestinationStorage = {id: '2', name: 'name 2', productsCount: 210};

		expect(newStorage).toEqual({
			source: expectedSourceStorage,
			destination: expectedDestinationStorage
		});

		expect(storage[StorageDBKeys.STORAGES][0]).toEqual(expectedSourceStorage);
		expect(storage[StorageDBKeys.STORAGES][1]).toEqual(expectedDestinationStorage);

		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					sourceStorageId: '1',
					destinationStorageId: '2',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
					'2': {
						id: '2',
						name: 'name 2',
						productsCount: 200
					},
				},
				type: UpdateStorageType.MOVE
			}
		]);
	});

	test('updateStorage multiple types: add, use, move, inventory', async () => {
		const afterAddStorage = await new StorageDB().updateStorage({
			data: {
				storageId: '1',
				count: 50,
			},
			type: UpdateStorageType.ADD
		});

		expect(afterAddStorage).toEqual({id: '1', name: 'name 1', productsCount: 150});

		const afterUseStorage = await new StorageDB().updateStorage({
			data: {
				storageId: '3',
				count: 50,
			},
			type: UpdateStorageType.USE
		});

		expect(afterUseStorage).toEqual({id: '3', name: 'name 3', productsCount: 250});

		const afterMoveStorage = await new StorageDB().updateStorage({
			data: {
				sourceStorageId: '1',
				destinationStorageId: '3',
				count: 100,
			},
			type: UpdateStorageType.MOVE
		});

		expect(afterMoveStorage).toEqual({
			source: {id: '1', name: 'name 1', productsCount: 50},
			destination: {id: '3', name: 'name 3', productsCount: 350}
		});

		const afterInventoryStorage = await new StorageDB().updateStorage({
			data: {
				storageId: '2',
				count: 150,
			},
			type: UpdateStorageType.INVENTORY
		});

		expect(afterInventoryStorage).toEqual({id: '2', name: 'name 2', productsCount: 150});


		expect(storage[StorageDBKeys.STORAGES]).toEqual([
			{id: '1', name: 'name 1', productsCount: 50},
			{id: '2', name: 'name 2', productsCount: 150},
			{id: '3', name: 'name 3', productsCount: 350},
		]);

		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 50
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					}
				},
				type: UpdateStorageType.ADD
			},
			{
				data: {
					storageId: '3',
					count: 50
				},
				id: 102,
				storages: {
					'3': {
						id: '3',
						name: 'name 3',
						productsCount: 300
					}
				},
				type: UpdateStorageType.USE
			},
			{
				data: {
					sourceStorageId: '1',
					destinationStorageId: '3',
					count: 100
				},
				id: 103,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 150
					},
					'3': {
						id: '3',
						name: 'name 3',
						productsCount: 250
					},
				},
				type: UpdateStorageType.MOVE
			},
			{
				data: {
					storageId: '2',
					count: 150
				},
				id: 104,
				storages: {
					'2': {
						id: '2',
						name: 'name 2',
						productsCount: 200
					}
				},
				type: UpdateStorageType.INVENTORY
			}
		]);
	});

	test('getActions', () => {
		const initActions = [{id: 1111}, {id: 2222}];
		storage[StorageDBKeys.ACTIONS] = initActions;
		const actions = new StorageDB().getActions();
		expect(actions).toEqual(initActions);
	});

	test('addActions type: add', () => {
		new StorageDB().addAction({
			data: {
				storageId: '1',
				count: 10,
			},
			type: UpdateStorageType.ADD
		});

		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
				},
				type: UpdateStorageType.ADD
			}
		]);
	});

	test('addActions type: use', () => {
		new StorageDB().addAction({
			data: {
				storageId: '1',
				count: 10,
			},
			type: UpdateStorageType.USE
		});

		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
				},
				type: UpdateStorageType.USE
			}
		]);
	});

	test('addActions type: inventory', () => {
		new StorageDB().addAction({
			data: {
				storageId: '1',
				count: 10,
			},
			type: UpdateStorageType.INVENTORY
		});

		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					storageId: '1',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
				},
				type: UpdateStorageType.INVENTORY
			}
		]);
	});

	test('addActions type: move', () => {
		new StorageDB().addAction({
			data: {
				sourceStorageId: '1',
				destinationStorageId: '2',
				count: 10,
			},
			type: UpdateStorageType.MOVE
		});

		expect(storage[StorageDBKeys.ACTIONS]).toEqual([
			{
				data: {
					sourceStorageId: '1',
					destinationStorageId: '2',
					count: 10
				},
				id: 101,
				storages: {
					'1': {
						id: '1',
						name: 'name 1',
						productsCount: 100
					},
					'2': {
						id: '2',
						name: 'name 2',
						productsCount: 200
					},
				},
				type: UpdateStorageType.MOVE
			}
		]);
	});

	test('removeAction', () => {
		storage[StorageDBKeys.ACTIONS] = [{id: 1111}, {id: 2222}, {id: 3333}];
		new StorageDB().removeAction(1111);
		expect(storage[StorageDBKeys.ACTIONS]).toEqual([{id: 2222}, {id: 3333}]);
	});
});

export {};