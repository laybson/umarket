const MarketService = require('../services/marketService');
const Filter = require('../components/enums/filter');


/**
 * Retrieves a list of markets based on the provided query parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
const getMarkets = async (req, res) => {
    let json = {error: '', result: []};

    const {label, ...filters} = req.query;
    const availableFilters = Object.keys(filters).map(filter => {
        if (Object.keys(Filter).some(key => key.toLowerCase() === filter)) return filter
    })

    const markets = await MarketService.getMarkets(label, availableFilters)

    json.result = markets

    res.json(json)
}

/**
 * Creates a new market with the provided information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
const createMarket = async (req, res) => {
    let json = {error: '', result: []};

    const info = req.body;

    const feira = await MarketService.createMarket(info);
    json.result = feira

    res.json(json)
}

/**
 * Updates an existing market with the provided information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
const updateMarket = async (req, res) => {
    let json = {error: '', result: []};

    const { registro } = req.params;
    const info = req.body;

    const feira = await MarketService.updateMarket(registro, info);
    json.result = feira

    res.json(json)
}

/**
 * Deletes an existing market with the provided ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
const deleteMarket = async (req, res) => {
    let json = {error: '', result: []};

    const { registro } = req.params;

    const deleted = await MarketService.deleteMarket(registro);

    json.result = deleted

    res.json(json)
}

module.exports = {
    getMarkets,
    createMarket,
    updateMarket,
    deleteMarket,
}
