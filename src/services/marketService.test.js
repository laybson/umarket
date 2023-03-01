const {
    getMarkets,
    createMarket,
    updateMarket,
    deleteMarket,
} = require('./marketService');
const Market = require('../repository/Market');
const {
    createInfo,
    updateInfo,
    validMarket,
    multiMarkets,
    auxValidMarket,
} = require('../components/mocks/marketMocks');
const Filter = require('../components/enums/filter');

jest.mock('../repository/Market', () => ({
     create: jest.fn(),
     update: jest.fn(),
     getByFilter: jest.fn(),
     deleteMarket: jest.fn(),
}));

describe('createMarket', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a market with valid info', async () => {
        Market.create.mockResolvedValue(validMarket);

        const result = await createMarket(createInfo);

        expect(result).toEqual(validMarket);
        expect(Market.create).toHaveBeenCalledWith(createInfo);
    });

    it('should handle error when creating a market', async () => {
        const error = new Error('Could not create market');
        Market.create.mockRejectedValue(error);

        const result = await createMarket(createInfo);

        expect(result).toEqual(error);
        expect(Market.create).toHaveBeenCalledWith(createInfo);
    });

    it('should only insert valid columns', async () => {
        const info = { dorga: 'Cola de sapateiro', ...createInfo };
        Market.create.mockResolvedValue(validMarket);

        const result = await createMarket(info);

        expect(result).toEqual(validMarket);
        expect(Market.create).toHaveBeenCalledWith(createInfo);
    });
});

describe('updateMarket', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a market successfully', async () => {
        const { registro, info } = updateInfo;
        Market.update.mockResolvedValue(auxValidMarket);

        const result = await updateMarket(registro, info);

        expect(result).toEqual(auxValidMarket);
        expect(Market.update).toHaveBeenCalledWith(registro, info);
    });

    it('should handle errors during a update', async () => {
        const { registro, info } = updateInfo;
        const error = new Error('Update failed');
        Market.update.mockRejectedValue(error);

        const result = await updateMarket(registro, info);

        expect(result).toEqual(error);
        expect(Market.update).toHaveBeenCalledWith(registro, info);
    });
});

describe('deleteMarket', () => {
    const { registro } = validMarket;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a market and return the result', async () => {
        Market.deleteMarket.mockResolvedValue(true);

        const result = await deleteMarket(registro);

        expect(result).toBe(true);
        expect(Market.deleteMarket).toHaveBeenCalledWith(registro);
    });

    it('should handle errors when deleting a market', async () => {
        const error = new Error('Unable to delete market');
        Market.deleteMarket.mockRejectedValue(error);

        const result = await deleteMarket(registro);

        expect(result).toEqual(error);
        expect(Market.deleteMarket).toHaveBeenCalledWith(registro);
    });
});

describe('getMarkets', () => {
    const filters = Object.keys(Filter);
    const label = validMarket.distrito;
    const markets = multiMarkets(label);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array if not label', async () => {
        const result = await getMarkets('', []);

        expect(result).toEqual([]);
        expect(Market.getByFilter).not.toHaveBeenCalled();
    });

    it('should search with all filters if no filters are provided', async () => {
        Market.getByFilter = jest.fn().mockResolvedValue(markets);

        const result = await getMarkets(label, []);

        expect(result).toEqual(markets);
        expect(Market.getByFilter.mock.calls).toEqual(
            filters.map(filter => {
                return [{label, filter}]
            })
        );
    });

    it('should return markets filtered by each provided filter', async () => {
        filters.forEach((_, i) => {
            Market.getByFilter.mockResolvedValueOnce([markets[i]])
        });

        const result = await getMarkets(label, filters);

        expect(result).toEqual([...markets]);
        expect(Market.getByFilter).toHaveBeenCalledTimes(filters.length);
        expect(Market.getByFilter.mock.calls).toEqual(
            filters.map(filter => {
                return [{label, filter}]
            })
        );
    });

    it('should handle errors when getting markets', async () => {
        const error = new Error('Unable to get markets');
        Market.getByFilter.mockRejectedValue(error);

        const result = await getMarkets(label, filters);

        expect(result).toBe(error);
        expect(Market.getByFilter).toHaveBeenCalledWith({label, filter: filters[0]});
    });

    it('should return unique markets', async () => {
        const listWithDuplicates = [markets[0], markets[1], ...markets]

        Market.getByFilter.mockResolvedValue(listWithDuplicates);

        const result = await getMarkets(label, []);

        expect(result.length).toBe(markets.length);
        expect(result).toEqual([...new Set(markets)]);
    });
});
