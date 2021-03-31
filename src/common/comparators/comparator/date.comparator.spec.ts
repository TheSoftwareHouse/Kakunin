import { DateComparator, supportedFormats } from './date.comparator';

describe('Date comparator', () => {
  it('is satisfied by dates', () => {
    const dates = ['20-12-2017', '20-12-17', '20/12/2017', '20/12/17'];

    expect(DateComparator.isSatisfiedBy(dates)).toEqual(true);
  });

  it('supports only specified date formats', () => {
    const dates = ['12-20-2017', '20/20/17', 'not-a-date', 31337];

    dates.forEach((date) => expect(DateComparator.isSatisfiedBy([date])).toEqual(false));
  });

  it('is pluggable', () => {
    supportedFormats.push('MM-DD-YYYY');

    expect(DateComparator.isSatisfiedBy(['12-20-2017'])).toEqual(true);
  });

  it('it returns resolved promise if dates are in ascending order', (done) => {
    const ascendingDates = ['10-12-2017', '11-12-2017', '01-01-2018'];

    DateComparator.compare(ascendingDates, 'ascending').then(() => done());
  });

  it('it returns resolved promise if dates are in descending order', (done) => {
    const descendingDates = ['10-12-2019', '11-12-2018', '01-01-2017'];

    DateComparator.compare(descendingDates, 'descending').then(() => done());
  });

  it('it returns rejected promise if dates are not in ascending order for ascending order expectation', (done) => {
    const descendingDates = ['10-12-2019', '11-12-2018', '01-01-2017'];

    DateComparator.compare(descendingDates, 'ascending').catch(() => done());
  });

  it('it returns rejected promise if dates are not in descending order for descending order expectation', (done) => {
    const ascendingDates = ['10-12-2017', '11-12-2017', '01-01-2018'];

    DateComparator.compare(ascendingDates, 'descending').catch(() => done());
  });
});
