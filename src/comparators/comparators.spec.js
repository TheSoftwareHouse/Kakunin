import { create } from './comparators';

const comparators = create();

describe('Comparators', () => {
  it('throws an error when no comparator was found', () => {
    const values = ['unspecified-value', 'other-value'];
    expect(() => comparators.compare(values, 'ascending')).toThrow(`Could not find comparator for ${values}.`);
  });

  it('compares values using comparator that can handle given set of values', (done) => {
    const numbers = [2, 3, 4];
    comparators.compare(numbers, 'ascending').then(() => done());
  });

  it('add new comparator', (done) => {
    const myComparator = {
      isSatisfiedBy: (values) => {
        for(let i=0; i<values.length; i++) {
          if (values[i] !== 'foo' && values[i] !== 'bar') {
            return false;
          }
        }

        return true;
      },
      compare: (values, order) => {
        for (let i = 1; i < values.length; i++) {
          const previousValue = values[i - 1];
          const currentValue = values[i];

          if (previousValue === currentValue) {
            return Promise.reject('Wrong order');
          }
        }

        return Promise.resolve('Foo bar!');
      }
    };

    comparators.addComparator(myComparator);

    const myValues = ['foo', 'bar', 'foo', 'bar', 'foo', 'bar'];

    comparators.compare(myValues, 'any').then((value) => {
      expect(value).toEqual('Foo bar!');
      done();
    })
  });
});
