const FileHandler = require('./utils/fileHandling');
const pluralize = require('./utils/pluralize');

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
    constructor(status, action, object, time) {
        this.status = status;
        this.action = action;
        this.object = object;
        this.time = time;
    }

    write = () => {
        const message = buildMessage(this);
        FileHandler.write({
            fileName: this.action,
            info: message
        })
    }
}
