import log from '../src/log';

console.log = jest.fn();

describe('Log Test', () => {
  beforeEach(() => {
    console.log.mockClear();
  });

  test('log error', () => {
    const error = { name: 'error name', message: 'error message', stack: 'error stack' };
    process.env.log_level = 'ERROR';

    log.debug('debug');
    log.info('info');
    log.warn('warn');
    expect(console.log).not.toHaveBeenCalled();
    log.error('error', null, error);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith(JSON.stringify({
      ...{ errorName: error.name, errorMessage: error.message, stackTrace: error.stack },
      level: 'ERROR',
      message: 'error',
    }));
  });

  test('log warn', () => {
    const logObject = { name: 'name' };
    const error = { name: 'error name', message: 'error message', stack: 'error stack' };
    process.env.log_level = 'WARN';

    log.debug('debug');
    log.info('info');
    expect(console.log).not.toHaveBeenCalled();
    log.warn('warn');
    log.error('error', logObject, error);
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenNthCalledWith(1, JSON.stringify({
      level: 'WARN',
      message: 'warn',
    }));
    expect(console.log).toHaveBeenNthCalledWith(2, JSON.stringify({
      ...logObject,
      ...{ errorName: error.name, errorMessage: error.message, stackTrace: error.stack },
      level: 'ERROR',
      message: 'error',
    }));
  });

  test('log info', () => {
    process.env.log_level = 'INFO';

    log.debug('debug');
    expect(console.log).not.toHaveBeenCalled();
    log.info('info');
    log.warn('warn');
    log.error('error');
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(1, JSON.stringify({
      level: 'INFO',
      message: 'info',
    }));
    expect(console.log).toHaveBeenNthCalledWith(2, JSON.stringify({
      level: 'WARN',
      message: 'warn',
    }));
    expect(console.log).toHaveBeenNthCalledWith(3, JSON.stringify({
      level: 'ERROR',
      message: 'error',
    }));
  });

  test('log debug', () => {
    process.env.log_level = '';

    log.debug('debug');
    log.info('info');
    log.warn('warn');
    log.error('error');
    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenNthCalledWith(1, JSON.stringify({
      level: 'DEBUG',
      message: 'debug',
    }));
    expect(console.log).toHaveBeenNthCalledWith(2, JSON.stringify({
      level: 'INFO',
      message: 'info',
    }));
    expect(console.log).toHaveBeenNthCalledWith(3, JSON.stringify({
      level: 'WARN',
      message: 'warn',
    }));
    expect(console.log).toHaveBeenNthCalledWith(4, JSON.stringify({
      level: 'ERROR',
      message: 'error',
    }));
  });
});
