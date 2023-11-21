import {formValidate} from "./formValidate";


describe('StorageMove form validate', () => {
  test('Empty count value', () => {
    expect(formValidate(
      {count: '', destinationStorageId: 'test'},
      {name: '', id: '', productsCount: 40}
    )).toEqual({count: 'Incorrect value'});
  })
  test('Zero count value', () => {
    expect(formValidate(
      {count: '0', destinationStorageId: 'test'},
      {name: '', id: '', productsCount: 40}
    )).toEqual({count: 'Incorrect value'});
  })
  test('Correct count value', () => {
    expect(formValidate(
      {count: '20', destinationStorageId: 'test'},
      {name: '', id: '', productsCount: 40}
    )).toEqual({});
  })
  test('Max count value', () => {
    expect(formValidate(
      {count: '45', destinationStorageId: 'test'},
      {name: '', id: '', productsCount: 40}
    )).toEqual({count: 'Max value is 40'});
  })
  test('Edge count value', () => {
    expect(formValidate(
      {count: '40', destinationStorageId: 'test'},
      {name: '', id: '', productsCount: 40}
    )).toEqual({});
  })
  test('Incorrect destinationStorageId value', () => {
    expect(formValidate(
      {count: '20', destinationStorageId: ''},
      {name: '', id: '', productsCount: 40}
    )).toEqual({destinationStorageId: 'Select storage'});
  })
  test('All incorrect values (count: empty, dId: empty)', () => {
    expect(formValidate(
      {count: '', destinationStorageId: ''},
      {name: '', id: '', productsCount: 40}
    )).toEqual({count: 'Incorrect value', destinationStorageId: 'Select storage'});
  })
  test('All incorrect values (count: max, dId: empty)', () => {
    expect(formValidate(
      {count: '45', destinationStorageId: ''},
      {name: '', id: '', productsCount: 40}
    )).toEqual({count: 'Max value is 40', destinationStorageId: 'Select storage'});
  })
})

export {};