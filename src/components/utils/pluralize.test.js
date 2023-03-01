const pluralize = require('./pluralize');

describe('pluralize', () => {
    it('should return the singular form if count is 1', () => {
        const singular = 'Noi';
        const count = 1;
        const pluralChar = 's';

        const result = pluralize({ singular, count, pluralChar });

        expect(result).toBe(singular);
    });

    it('should return the plural form if count is not 1', () => {
        const singular = 'Sei';
        const count = 5;
        const pluralChar = 's';

        const result = pluralize({ singular, count, pluralChar });

        expect(result).toBe(`${singular}${pluralChar}`);
    });

    it('should allow for custom plural characters', () => {
        const singular = 'camarao';
        const count = 2;
        const pluralChar = 'zes';

        const result = pluralize({ singular, count, pluralChar });

        expect(result).toBe(`${singular}${pluralChar}`);
    });
});
