/**
 * User action to log.
 */
module.exports = class LogAction {
    static Create = new LogAction('create')
    static Update = new LogAction('update')
    static Search = new LogAction('search')
    static Delete = new LogAction('delete')

    constructor(name) {
        this.name = name
    }
}
