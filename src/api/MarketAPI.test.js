const {
    getMarkets,
    createMarket,
    updateMarket,
    deleteMarket,
  } = require('./MarketAPI');
const MarketService = require('../services/marketService');
const {
    createInfo,
    updateInfo,
    validMarket,
    multiMarkets,
} = require('../components/mocks/marketMocks');

jest.mock('../services/marketService');

describe('marketAPI', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getMarkets', () => {
        it('should return a list of markets', async () => {
            const label = validMarket.nome_feira;
            const markets = multiMarkets(label);
            MarketService.getMarkets.mockResolvedValue(markets);

            const mockRequest = { query: { label, availableFilters: [] } };
            const mockResponse = { json: jest.fn() };

            await getMarkets(mockRequest, mockResponse);

            expect(MarketService.getMarkets).toHaveBeenCalledWith(label, []);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: '', result: markets });
        });
    });

    describe('createMarket', () => {
        it('should create a new market', async () => {
            MarketService.createMarket.mockResolvedValue(createInfo);

            const mockRequest = { body: createInfo };
            const mockResponse = { json: jest.fn() };

            await createMarket(mockRequest, mockResponse);

            expect(MarketService.createMarket).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: '', result: createInfo });
        });
    });

    describe('updateMarket', () => {
        it('should update an existing market', async () => {
            const { registro, info } = updateInfo;
            MarketService.updateMarket.mockResolvedValue(updateInfo);

            const mockRequest = { params: { registro }, body: info };
            const mockResponse = { json: jest.fn() };

            await updateMarket(mockRequest, mockResponse);

            expect(MarketService.updateMarket).toHaveBeenCalledWith(mockRequest.params.registro, mockRequest.body);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: '', result: updateInfo });
        });
    });

    describe('deleteMarket', () => {
        it('should delete an existing market', async () => {
            const registro = validMarket.registro;
            const mockDeleted = true;
            MarketService.deleteMarket.mockResolvedValue(mockDeleted);

            const mockRequest = { params: { registro } };
            const mockResponse = { json: jest.fn() };

            await deleteMarket(mockRequest, mockResponse);

            expect(MarketService.deleteMarket).toHaveBeenCalledWith(mockRequest.params.registro);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: '', result: mockDeleted });
        });
    });
});
