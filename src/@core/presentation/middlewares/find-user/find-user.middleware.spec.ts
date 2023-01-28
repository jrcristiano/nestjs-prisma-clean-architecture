import { FindUserMiddleware } from './find-user.middleware';

describe('FindUserMiddleware', () => {
  it('should be defined', () => {
    expect(new FindUserMiddleware()).toBeDefined();
  });
});
