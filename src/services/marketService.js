const Market = require('../repository/Market');
const Filter = require('../components/enums/filter');
const Action = require('../components/enums/logAction');
const Status = require('../components/enums/logStatus');
const LogMarket = require('../components/log');
const CONSTANTS = require('../components/constants.js');

// const Market = MarketRepository();

const errorHandler = ({action, error}) => {
    const log = new LogMarket(
        Status.Error.name,
        action=action,
        object=error,
        time=new Date(Date.now()).toISOString());
    log.write();
    return error;
}

const successHandler = ({action, result}) => {
    const log = new LogMarket(
        Status.Success.name,
        action=action,
        object=result,
        time=new Date(Date.now()).toISOString());
    log.write();
    return result;
}

const getMarkets = async (label, filters) => {
    if (!label) return successHandler({action: Action.Search.name, result: []});

    const filtering = filters.length ? filters : Object.keys(Filter);

    return await filtering.reduce(async (markets, filter) => {
        const data = await markets;
        return await Market.getByFilter({ label, filter }).catch(error => {
            throw error
        }).then((result) => {
            data.push(...result);
            return data            
        });
    }, []).then(
        result => {
            return successHandler({
                action: Action.Search.name,
                result: result ? Array.from(new Set(result.map(JSON.stringify)), JSON.parse) : []
            });
        }, error => {
            return errorHandler({
                action: Action.Search.name,
                error
            })
        }
    )
}

const insertionMarketInfo = info => {
    let newMarketInfo = {};
    CONSTANTS.marketColumns.forEach(column => {
        newMarketInfo[column] = info[column]
    })
    return newMarketInfo;
}

const createMarket = async info => {
    // TODO: Validations
    return await Market.create(
        insertionMarketInfo(info)
    ).catch(error => {
        return errorHandler({
            action: Action.Create.name,
            error
        })
    }).then(result => {
        return successHandler({
            action: Action.Create.name,
            result
        });
    });
};

const updateMarket = async (registro, info) => {
    // TODO: Validations
    return await Market.update(registro, info).catch(error => {
        return errorHandler({
            action: Action.Update.name,
            error
        })
    }).then(result => {
        return successHandler({
            action: Action.Update.name,
            result
        });
    });
};

const deleteMarket = async registro => {
    return await Market.deleteMarket(registro).catch(error => {
        return errorHandler({
            action: Action.Delete.name,
            error
        })
    }).then(result => {
        return successHandler({
            action: Action.Delete.name,
            result
        });
    });
};

module.exports = {
    getMarkets,
    createMarket,
    updateMarket,
    deleteMarket,
};
