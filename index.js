'use strict'

const assert = require('assert')
const pino = require('pino')

/**
 * Custom Seneca logger for use with Pino.
 *
 * This project is based on the example conventions documented at the following Seneca url.
 *
 * -  https://github.com/senecajs/seneca/blob/master/docs/examples/custom-logger.js
 *
 */
class PinoLogAdapter {
  /**
   * Construct a new adapter.
   * @param options - user supplied options.
   * @param options.logger - a Pino logger instance.
   * @param options.config - a Pino logger configuration.
   * @param options.stream - an optional output stream to log to.
   */
  constructor(options = {}) {
    // Assertions.
    assert(!(options.config && options.logger), '"config" and "logger" specified.  Use one or the other.')
    assert(options.config || options.logger, '"config" or "logger must be specified.')

    if (options.stream) {
      // Don't supply stream and a logger instance.
      assert(!options.logger, '"logger" and "stream" are specified, Use config with stream.')
    }

    if (options.config) {
      if (options.stream) {
        // A stream was also supplied.
        this._logger = pino(options.config, options.stream)
      } else {
        // Initialize using a configuration.
        this._logger = pino(options.config)
      }
    } else {
      // A pino logger was supplied.
      this._logger = options.logger
    }

    // Return the logger class simplify the usage.
    return this.logger
  }

  /**
   * Retrieve the adapter logger.
   * @returns {PinoLogger} - the log adapter.
   */
  get logger() {
    const parent = this

    function PinoLogger() {
    }

    PinoLogger.preload = function () {
      // The Seneca instance.
      // const seneca = this

      // Everything something is logged it calls whatever
      // custom adapter is set. Adapters are passed the
      // current instance of Seneca plus the raw payload.
      function adapter(context, payload) {
        // Grab the log level before deleting the Seneca level.
        let level = payload.level

        // Avoid duplicate level data in the output.
        delete payload.level

        if (level in parent._logger) {
          // Call the appropriate Pino log function.
          parent._logger[level].call(parent._logger, payload)
        }
        else {
          // Default to info if the level isn't found.
          // TODO: Support custom levels.
          parent._logger.info(payload)
        }
      }

      // Seneca looks for logging adapters in `extend.logger`
      // simply assign your adapter to receive the logs.
      return {
        extend: {
          logger: adapter
        }
      }
    }

    return PinoLogger
  }
}

// Export the adapter.
module.exports = PinoLogAdapter