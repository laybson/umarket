const MarketService = require('../services/marketService');
const Filter = require('../components/enums/filter');

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

const createMarket = async (req, res) => {
    let json = {error: '', result: []};

    const info = req.body;

    const feira = await MarketService.createMarket(info);
    json.result = feira

    res.json(json)
}

const updateMarket = async (req, res) => {
    let json = {error: '', result: []};

    const { registro } = req.params;
    const info = req.body;

    const feira = await MarketService.updateMarket(registro, info);
    json.result = feira

    res.json(json)
}

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
