import {formValidate} from "./formValidate";


describe('StorageAdd form validate', () => {
  test('Empty count value', () => {
    expect(formValidate({count: ''})).toEqual({count: 'Incorrect value'});
  })
  test('Zero count value', () => {
    expect(formValidate({count: '0'})).toEqual({count: 'Incorrect value'});
  })
  test('Correct count value', () => {
    expect(formValidate({count: '10'})).toEqual({});
  })
})

export {};