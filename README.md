![Logo][]
> A Node.js toolkit for Microservice architectures

# Seneca Pino Adapter

[![npm version](https://badge.fury.io/js/seneca-pino-adapter.svg)](https://badge.fury.io/js/seneca-pino-adapter)
[![Build Status][travis-badge]][travis-url]
[![Coverage Status](coveralls-badge)](coveralls-url)

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
    const Seneca = require('seneca')
    
    // Pino Support.
    const Pino = require('pino')
    
    // Load the adapter.
    const PinoLogAdapter = require('seneca-pino-adapter')
    
    // Create a pino logger instance.
    const logger = Pino({level: 'info'})
    
    // Initialize the Seneca toolkit with the PinoLogAdapter and a Pino instance.
    const seneca = Seneca({
      internal: {
        logger: new PinoLogAdapter({
          logger: logger
        })
      }
    })
    
    // Log output via Seneca.
    seneca.log.debug('This is a debug log statement!')
    seneca.log.info('This is an info log statement!')
    seneca.log.error('This is an error log statement!')
    seneca.log.warn('This is a warn log statement!')
    seneca.log.fatal('This is a fatal log statement!')
    

### Configure Using a Pino Logger Configuration

    // Seneca support.
    const Seneca = require('seneca')
    
    // Load the adapter.
    const PinoLogAdapter = require('seneca-pino-adapter')
    
    // Create a pino logger instance using configuration.
    const config = {level: 'info'}
    
    // Initialize the Seneca toolkit with the PinoLogAdapter and a Pino configuration object.
    const seneca = Seneca({
      internal: {
        logger: new PinoLogAdapter({
          config: {
            level: 'info'
          }
        })
      }
    })
    
    // Log output via Seneca.
    seneca.log.debug('This is a debug log statement!')
    seneca.log.info('This is an info log statement!')
    seneca.log.error('This is an error log statement!')
    seneca.log.warn('This is a warn log statement!')
    seneca.log.fatal('This is a fatal log statement!')
    

or 

    // Initialize the Seneca toolkit with the PinoLogAdapter and a Pino configuration object and a output stream.
    const seneca = Seneca({
      internal: {
        logger: new PinoLogAdapter({
          config: {
            level: 'info'
          },
          stream: output_stream
        })
      }
    })
    
    // Log output via Seneca.
    seneca.log.debug('This is a debug log statement!')
    seneca.log.info('This is an info log statement!')
    seneca.log.error('This is an error log statement!')
    seneca.log.warn('This is a warn log statement!')
    seneca.log.fatal('This is a fatal log statement!')
    

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


[Logo]: https://camo.githubusercontent.com/4a0178ff2abf26f9214d4d98bc23eec356ced357/687474703a2f2f73656e6563616a732e6f72672f66696c65732f6173736574732f73656e6563612d6c6f676f2e706e67
[npm-url]: https://npmjs.com/package/seneca-pino-adapter
[npm-badge]: https://badge.fury.io/js/seneca-pino-adapter.svg
[travis-badge]: https://api.travis-ci.org/blueshirts/seneca-pino-adapter.svg
[travis-url]: https://travis-ci.org/blueshirts/seneca-pino-adapter
[coveralls-badge]: https://coveralls.io/repos/github/blueshirts/seneca-pino-adapter/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/blueshirts/seneca-pino-adapter?branch=master

