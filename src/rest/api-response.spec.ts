const ApiResponse = require('./api-response');

const response = new ApiResponse(200, { type: 'Fiat', model: '500', color: 'white' });

describe('apiResponse', () => {
  it('returns true when statuses are the same', () => {
    expect(response.hasStatus(200)).toEqual(true);
  });

  it('returns false when statuses are different', () => {
    expect(response.hasStatus(100)).toEqual(false);
  });

  it('returns true when response match given object', () => {
    expect(
      response.hasBodyMatch({
        type: 'Fiat',
        model: '500',
        color: 'white',
      })
    ).toEqual(true);
  });

  it('returns false when response doesnt match given object', () => {
    expect(
      response.hasBodyMatch({
        model: '500',
        color: 'white',
      })
    ).toEqual(false);
  });
});
