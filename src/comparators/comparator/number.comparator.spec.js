import { NumberComparator } from './number.comparator';

describe('Number comparator', () => {
  it('is satisfied by numbers', () => {
    const numbers = [
      '10',
      '10.09',
      '0.3'
    ];

    expect(NumberComparator.isSatisfiedBy(numbers)).toEqual(true);
  });

  it('supports only specified number records', () => {
    const numbers = [
      'string',
      '12-12-2017'
    ];

    numbers.forEach((number) => expect(NumberComparator.isSatisfiedBy([number])).toEqual(false));
  });

  it('it returns resolved promise if numbers are in ascending order', (done) => {
    const ascendingNumbers = [
      '0.25',
      '10',
      '102',
      '105',
      '125.32'
    ];

    NumberComparator.compare(ascendingNumbers, 'ascending').then(() => done());
  });

  it('it returns resolved promise if numbers are in descending order', (done) => {
    const descendingNumbers = [
      '102',
      '100',
      '10.03'
    ];

    NumberComparator.compare(descendingNumbers, 'descending').then(() => done());
  });

  it('it returns rejected promise if numbers are not in ascending order for ascending order expectation', (done) => {
    const descendingNumbers = [
      331,
      223.03,
      '123',
      '11.04',
      0.1
    ];

    NumberComparator.compare(descendingNumbers, 'ascending').catch(() => done());
  });

  it('it returns rejected promise if numbers are not in descending order for descending order expectation', (done) => {
    const ascendingNumbers = [
      '312',
      '324.43',
      '1323.320',
      1321,
      0.5
    ];

    NumberComparator.compare(ascendingNumbers, 'descending').catch(() => done());
  });

  it('it returns rejected promise if numbers are in incorrect format', (done) => {
    const containsIncorrectNumber = [
      '10',
      '999,32',
      '8dsa',
      '20/12/2018'
    ];

    NumberComparator.compare(containsIncorrectNumber, 'ascending').catch(() => done());
  });
});
