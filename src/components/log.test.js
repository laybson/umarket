const Log = require('./log');
const FileHandler = require('./utils/fileHandling');

describe('Log', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('constructor', () => {
        it('should create a Log instance with status, action, object, and time properties', () => {
            const status = 'success';
            const action = 'create';
            const object = { color: 'Fucsia' };
            const time = new Date();

            const log = new Log(status, action, object, time);

            expect(log.status).toBe(status);
            expect(log.action).toBe(action);
            expect(log.object).toBe(object);
            expect(log.time).toBe(time);
        });
    });

    describe('write', () => {
        it('should call FileHandler.write with the correct arguments', () => {
            const status = 'success';
            const action = 'create';
            const object = { fruit: 'acerola' };
            const time = new Date();
            const log = new Log(status, action, object, time);
            const fileName = `${action}`;
            const message = `
        ${action} ${status}\n
        results: ${object}\n
        at: ${time}\n
    `;
            const writeSpy = jest.spyOn(FileHandler, 'write');

            log.write();

            expect(writeSpy).toHaveBeenCalledWith({
                fileName,
                info: message,
            });
        });
    });
});
