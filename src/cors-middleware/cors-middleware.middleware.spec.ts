import { CorsMiddlewareMiddleware } from './cors-middleware.middleware';

describe('CorsMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new CorsMiddlewareMiddleware()).toBeDefined();
  });
});
