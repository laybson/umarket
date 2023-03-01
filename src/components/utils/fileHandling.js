const fs = require('fs');
const CONSTANTS = require('../constants');

module.exports = {
    write: ({fileName, info}) => {
        const path = `${__dirname + CONSTANTS.logPathPrefix + fileName + CONSTANTS.logPathSuffix}`;

        fs.appendFile(path, info, (err) => {
            if (err) throw err;
        });
    }
}
