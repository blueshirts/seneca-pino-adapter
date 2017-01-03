![Logo][]
> A Node.js toolkit for Microservice architectures

# Seneca Pino Adapter

[![Npm][BadgeNpm]][Npm]
[![Build Status][travis-badge]][travis-url]

A log adapter for the Seneca microservice toolkit that enables you to output your logs to Pino.  The code in this 
project follows the Seneca custom logger example.

https://github.com/senecajs/seneca/blob/master/docs/examples/custom-logger.js


## Why?

I have been working with Seneca for a short period of time and while I found the toolkit very useful though I was very
frustrated by the lack of ability to manage and control my log output.  I found a few examples that enabled external
loggers such as Pino and I am hopeful this adapter along with other Pino add-ons will satisfy my requirements. 


## Pino - Super Fast, All Natural JSON Logger

> Pino claims to be an extremely fast Node.js logger, inspired by Bunyan.  View additional details at the following url.
     
https://github.com/pinojs/pino


## Install

    $ npm install --save seneca-pino-adapter



## Usage

### Configure Using an Existing Pino Logger Instance

This option will allow you complete control over creating a pino logger instance.

    // Seneca support.
    const seneca_lib = require('seneca')
    
    // Create a pino logger instance.
    const logger = pino({level: 'info'})
    
    // Initialize the Seneca toolkit with the PinoLogAdapter and a Pino instance.
    const seneca = seneca_lib({
      legacy: {logging: false},
      internal: {
        logger: new PinoLogAdapter({
          logger: logger
        }).logger
      }
    })
    
    // Log output via Seneca.
    log.debug('This is a debug log statement!')
    log.info('This is an info log statement!')
    log.error('This is an error log statement!')
    log.warn('This is a warn log statement!')
    log.fatal('This is a fatal log statement!')
    
    // Use the pino log instance to dynamically change the log level.
    logger.level = 'debug'
    
    // Use pino-debug to enable fine grained control over log output.
    TBD

### Configure Using a Pino Logger Configuration

    // Seneca support.
    const seneca_lib = require('seneca')

    // Create a pino logger instance using configuration.
    const config = {level: 'info'}
    
    // Initialize the Seneca toolkit with the PinoLogAdapter and a Pino configuration object.
    const seneca = seneca_lib({
      legacy: {logging: false},
      internal: {
        logger: new PinoLogAdapter({
          config: logger
        }).logger
      }
    })
    

or 

    // Initialize the Seneca toolkit with the PinoLogAdapter and a Pino configuration object and a output stream.
    const seneca = seneca_lib({
      legacy: {logging: false},
      internal: {
        logger: new PinoLogAdapter({
          config: logger,
          stream: output_stream
        }).logger
      }
    })
    

## Pino Debug

The pino-debug project seems to allow you to control your log output at very detailed level.

> Seamlessly integrates the debug module with the high performance pino logger so you can turn on debug logs in 
production scenarios with minimum overhead.

https://github.com/pinojs/pino-debug


## Caveats

- Custom log levels are not supported at the current time.


## Inspired by Seneca Pino Logger

I tried using the Seneca Pino Logger in an attempt to have Seneca logging that was fast, configurable levels, easy 
filtering of content at a detailed level, etc.  I found that at this time all of the features I needed were not 
supported so I submitted a pull request.  After studying the issues a bit I was inspired to create a new Pino adapter
that could be utilized right now.  I took a slightly different approach than the original project so I am not sure if
my changes are compatible.  Possibly if the approach in this project is useful then the code can be merged back at some
point.  In the mean time I am publishing this project to NPM so it can be easily accessed.

For details on the Seneca plugin go here:

https://github.com/senecajs/seneca-pino-logger


[Logo]: http://senecajs.org/files/assets/seneca-logo.jpg
[npm-url]: https://npmjs.com/package/seneca-pino-adapter
[npm-badge]: https://img.shields.io/npm/v/seneca-pino-adapter.svg
[travis-badge]: https://travis-ci.org/senecajs/seneca-pino-adapter.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-pino-adapter