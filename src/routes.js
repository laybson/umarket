const { Router } = require('express');
const router = Router();

const Filter = require('./components/enums/filter');
const MarketAPI = require('./api/MarketAPI');

// Create a string of URL parameters to use for filters
const filters = Object.values(Filter).map(filter => `/:${filter.name}?`).join('');

router.get(`/umarkets/:label?${filters}`, MarketAPI.getMarkets);
router.post('/umarket', MarketAPI.createMarket);
router.put('/umarket/:registro', MarketAPI.updateMarket);
router.delete('/umarket/del/:registro', MarketAPI.deleteMarket);

module.exports = router;
