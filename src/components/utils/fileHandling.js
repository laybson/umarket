/**
 * A module for writing information to a file.
 * @module fileWriter
 */

const fs = require('fs');
const CONSTANTS = require('../constants');

/**
 * Writes information to a file with the provided filename.
 * @function
 * @param {Object} options - The options object.
 * @param {string} options.fileName - The name of the file to write to.
 * @param {string} options.info - The information to write to the file.
 * @throws {Error} Throws an error if the write operation fails.
 */
module.exports = {
    write: ({fileName, info}) => {
        const path = `${__dirname + CONSTANTS.logPathPrefix + fileName + CONSTANTS.logPathSuffix}`;

        fs.appendFile(path, info, (err) => {
            if (err) throw err;
        });
    }
}
