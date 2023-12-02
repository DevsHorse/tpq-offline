import StorageApi from './StorageApi';
import {isOnline} from '../../../../shared/utils';
import OnlineStorageApi from './OnlineStorageApi';
import OfflineStorageApi from './OfflineStorageApi';

const mockedIsOnline = jest.mocked(isOnline);

describe('StorageApi', () => {
	test('init online config', () => {
		mockedIsOnline.mockImplementation(() => true);
		expect(new StorageApi().api instanceof OnlineStorageApi).toBe(true);
	});
	test('init offline config', () => {
		mockedIsOnline.mockImplementation(() => false);
		expect(new StorageApi().api instanceof OfflineStorageApi).toBe(true);
	});
});

export {};