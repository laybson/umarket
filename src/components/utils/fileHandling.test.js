const fs = require('fs');
const { write } = require('./fileHandling');
const CONSTANTS = require('../constants');

jest.mock('fs');

describe('logger', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('write', () => {
        it('should write info to a file', () => {
            const mockFileName = 'But its killing me';
            const mockInfo = 'That youre not here with me';
            const mockPath = `${__dirname + CONSTANTS.logPathPrefix + mockFileName + CONSTANTS.logPathSuffix}`;

            write({ fileName: mockFileName, info: mockInfo });

            expect(fs.appendFile).toHaveBeenCalledWith(mockPath, mockInfo, expect.any(Function));
        });

        it('should throw an error if there is an issue writing to the file', () => {
            const mockError = new Error('Test error');
            fs.appendFile.mockImplementation((path, info, callback) => {
                callback(mockError);
            });

            const mockFileName = 'Im living happily';
            const mockInfo = 'But im felling guilty';

            expect(() => {
                write({ fileName: mockFileName, info: mockInfo });
            }).toThrow(mockError);
        });
    });
});
