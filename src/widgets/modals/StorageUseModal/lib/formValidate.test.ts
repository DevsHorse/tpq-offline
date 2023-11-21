import {formValidate} from "./formValidate";


describe('StorageUse form validate', () => {
  test('Empty count value', () => {
    expect(formValidate(
      {count: ''},
      {id: '', name: '', productsCount: 40}
    )).toEqual({count: 'Incorrect value'});
  })
  test('Zero count value', () => {
    expect(formValidate(
      {count: '0'},
      {id: '', name: '', productsCount: 40}
    )).toEqual({count: 'Incorrect value'});
  })
  test('Max count value', () => {
    expect(formValidate(
      {count: '45'},
      {id: '', name: '', productsCount: 40}
    )).toEqual({count: 'Max value is 40'});
  })
  test('Correct count value', () => {
    expect(formValidate(
      {count: '10'},
      {id: '', name: '', productsCount: 40}
    )).toEqual({});
  })
})

export {};