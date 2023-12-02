import {validateMaxNumber} from './validateMaxNumber';


describe('validateMaxNumber', () => {
	test('Correct value (20 of 40)', () => {
		expect(validateMaxNumber(20, 40)).toBe(true);
	});
	test('Correct edge value (40 of 40)', () => {
		expect(validateMaxNumber(40, 40)).toBe(true);
	});
	test('Incorrect value (45 of 40)', () => {
		expect(validateMaxNumber(45, 40)).toBe(false);
	});
});

export {};