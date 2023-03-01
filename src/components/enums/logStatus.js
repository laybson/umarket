module.exports = class LogStatus {
    static Success = new LogStatus('success')
    static Error = new LogStatus('error')

    constructor(name) {
        this.name = name
    }
}
