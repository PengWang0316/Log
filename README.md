# Log Helper

A log helper to shutdown log information based on the process.env configuration  

[![Build Status](https://travis-ci.org/PengWang0316/Log.svg?branch=master)](https://travis-ci.org/PengWang0316/Log)
[![Coverage Status](https://coveralls.io/repos/github/PengWang0316/Log/badge.svg?branch=master)](https://coveralls.io/github/PengWang0316/Log?branch=master)

# Installing

```
npm install --save @kevinwang0316/log
```

# Configuration

Add a log_level variable to your .env file.
Or if you are using Fass solution such as AWS Lambda, set up the log_level to your environment.

Log all level of information (debug, info, warn, error)
log_level=DEBUG

Log info and above levels of information (info, warn, error)
log_level=INFO

Log warn and above levels of information (warn, error)
log_level=WARN

Log just error level of information (error)
log_level=ERROR

# Usage

```javascript
import log from '@kevinwang0316/log';
// For NodeJS
// const log = require(''@kevinwang0316/log'');

log.debug('Your debug information');
log.info('Your info information');
log.warn('Your warn information');
log.error('Your error information');
```

# License

Log is licensed under MIT License - see the [License file](https://github.com/PengWang0316/Log/blob/master/LICENSE).
