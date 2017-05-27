'use strict'

const Lab = require('lab')

const lab = (exports.lab = Lab.script())
const describe = lab.describe
const it = lab.it

// Testing support.
const chai = require('chai')
chai.config.includeStack = true
const should = chai.Should()

// Seneca support.
const Seneca = require('seneca')

// Pino support.
const Pino = require('pino')

// Use memory stream to assert log output.
const memory_stream_lib = require('memorystream')
// Add a reset buffer capability to memory stream.
const MemoryStream = function () {
  const s = memory_stream_lib.createWriteStream()
  s.reset = function () {
    // Clear the buffer.
    this.queue = []
  }
  return s
}

// Test log constants.
const DEBUG = 'This is a DEBUG log statement!'
const INFO = 'This is a INFO log statement!'
const WARN = 'This is a WARN log statement!'
const ERROR = 'This is a ERROR log statement!'
const FATAL = 'This is a FATAL log statement!'

// The project adapter instance.
const PinoLogAdapter = require('../')


/**
 * // To load a logger plugin, you MUST load it via
 * // options passed to seneca. Loggers need to be loaded
 * // right at the start of execution. Using .use(Logger)
 * // is not supported.
 *
 *     internal: {
 *       logger: new PinoLogAdapter({
 *         logger: pino({level: 'error'})
 *       }).logger
 *     }
 *
 */
describe('seneca-pino-adapter-tests', function () {

  describe('PinoLogAdapter tests', function () {

    it('should allow configuration via a pino instance', function (done) {
      const ostream = MemoryStream()
      const logger = Pino({level: 'info'}, ostream)
      const seneca = Seneca({
        internal: {
          logger: new PinoLogAdapter({
            logger: logger
          })
        }
      })

      assert_logging(seneca, logger, ostream)
      done()
    })

    it('should allow configuration via a pino configuration and stream', function (done) {
      // Create a stream to monitor the output.
      const ostream = MemoryStream()
      const seneca = Seneca({
        legacy: {logging: false},
        internal: {
          logger: new PinoLogAdapter({
            config: {
              level: 'info'
            },
            stream: ostream
          })
        }
      })

      assert_logging(seneca, null, ostream)
      done()
    })

    it('should allow configuration via a pino configuration', (done) => {
      // Without the stream there is no way to assert the output.
      const seneca = Seneca({
        internal: {
          logger: new PinoLogAdapter({
            config: {
              level: 'error'
            }
          })
        }
      })
      seneca.log.debug(DEBUG)
      done()
    })

    it('should throw an error if an invalid log level is specified', (done) => {
      // Create a stream to monitor the output.
      should.throw(function() {
        Seneca({
          internal: {
            logger: new PinoLogAdapter({
              config: {
                level: 'invalid-level'
              }
            })
          }
        })
      })
      done()
    })

    it('should throw an error if no config or logger is specified', function (done) {
      should.throw(function () {
        new PinoLogAdapter()
      })
      done()
    })

    it('should throw an error if both a config and logger are specified', function (done) {
      should.throw(function () {
        new PinoLogAdapter({
          config: {},
          logger: Pino()
        })
      })
      done()
    })

  })

})

/**
 * Assert logging to the seneca logger.  This function assumes the pino logger is set to level info.
 * @param seneca - the seneca instance.
 * @param logger - a optional pino logger instance.
 * @param ostream - the output log stream.
 */
function assert_logging(seneca, logger, ostream) {
  // Seneca should exist.
  should.exist(seneca)
  should.exist(seneca.log)

  // Log an debug statement, should not be printed.
  ostream.reset()
  ostream.toString().should.be.empty
  seneca.log.debug(DEBUG)
  ostream.toString().should.be.empty

  // Log an info, should be printed.
  ostream.reset()
  ostream.toString().should.be.empty
  seneca.log.info(INFO)
  let info_log = ostream.toString()
  should.exist(info_log)
  info_log.should.match(/"level":30/g)

  // Log an warning, should be printed.
  ostream.reset()
  ostream.toString().should.be.empty
  seneca.log.warn(WARN)
  let warn_log = ostream.toString()
  should.exist(warn_log)
  warn_log.should.match(/"level":40/g)

  // Log an error, should be printed.
  ostream.reset()
  ostream.toString().should.be.empty
  seneca.log.error(ERROR)
  let error_log = ostream.toString()
  should.exist(error_log)
  error_log.should.match(/"level":50/g)

  // Log a fatal, should be printed.
  ostream.reset()
  ostream.toString().should.be.empty
  seneca.log.fatal(FATAL)
  let fatal_log = ostream.toString()
  should.exist(fatal_log)
  fatal_log.should.match(/"level":60/g)

  if (logger) {
    // Attempt to change the log level to debug.
    logger.level = 'debug'

    // Log an debug statement, should now be printed.
    ostream.reset()
    ostream.toString().should.be.empty
    seneca.log.debug(DEBUG)
    let debug_log = ostream.toString()
    debug_log.should.match(/"level":20/g)
  }
}
