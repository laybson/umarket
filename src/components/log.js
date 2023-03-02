const FileHandler = require('./utils/fileHandling');
const pluralize = require('./utils/pluralize');

/**
 * Builds a log message from the provided log object.
 * @param {Object} log - The log object containing information to be included in the message.
 * @param {string} log.status - The status of the log message.
 * @param {string} log.action - The action associated with the log message.
 * @param {Object} log.object - The object associated with the log message.
 * @param {string} log.time - The timestamp of the log message.
 * @returns {string} A log message containing the provided log object's information.
 */
const buildMessage = log => {
    let message = `
        ${log.action} ${log.status}\n
        ${pluralize({
            singular: 'result',
            count: Object.keys(log.object || {}).lenght
        })}: ${log.object}\n
        at: ${log.time}\n
    `;
    return message;
}

module.exports = class Log {
    /**
     * Represents a log object that can be written to a file.
     * @constructor
     * @param {string} status - The status of the log message.
     * @param {string} action - The action associated with the log message.
     * @param {Object} object - The object associated with the log message.
     * @param {string} time - The timestamp of the log message.
     */
    constructor(status, action, object, time) {
        this.status = status;
        this.action = action;
        this.object = object;
        this.time = time;
    }

    /**
     * Writes the log message to a file using the FileHandler module.
     */
    write = () => {
        const message = buildMessage(this);
        FileHandler.write({
            fileName: this.action,
            info: message
        })
    }
}
