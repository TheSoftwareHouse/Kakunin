import ApiResponse from '../rest/apiResponse.js';

const response = new ApiResponse(200, { type: 'Fiat', model: '500', color: 'white' });

describe('apiResponse', () => {
  it('returns true when statuses are the same', () => {
    const status = 200;
    expect(response.hasStatus(status)).toEqual(true);
  });
  it('returns false when statuses are different', () => {
    const status = 100;
    expect(response.hasStatus(status)).toEqual(false);
  });
  it('returns true when response match given object', () => {
    const body = { type: 'Fiat', model: '500', color: 'white' };
    expect(response.hasBodyMatch(body)).toEqual(true);
  });
  it('returns false when response doesnt match given object', () => {
    const body = { model: '500', color: 'white' };
    expect(response.hasStatus(body)).toEqual(false);
  });
});
