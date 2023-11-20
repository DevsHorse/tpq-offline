import {UpdateStorageOptions} from "./UpdateStorageOptions";
import {IStorage} from "./Storage";


export type SavedAction = {id: number, storages: {[id: string]: IStorage}} & UpdateStorageOptions;