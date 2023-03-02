const Market = require('../repository/Market');
const Filter = require('../components/enums/filter');
const Action = require('../components/enums/logAction');
const Status = require('../components/enums/logStatus');
const LogMarket = require('../components/log');
const CONSTANTS = require('../components/constants.js');

/**
 * Handles error logging and rethrowing of errors
 * @callback errorHandler
 * @param {Object} object - Object containing action and error to be logged
 * @param {string} options.action - The action that resulted in the error.
 * @param {Error} options.error - The error object to be handled.
 * @returns {Object} - Returns the same error object as was passed in
 */
const errorHandler = ({action, error}) => {
    const log = new LogMarket(
        Status.Error.name,
        action=action,
        object=error,
        time=new Date(Date.now()).toISOString());
    log.write();
    // TODO: Exceptions module
    return error;
}

/**
 * Handles successful actions and logs them to the system.
 * @param {Object} options - The options to be used for success handling.
 * @param {string} options.action - The action that was successful.
 * @param {*} options.result - The result of the successful action.
 * @returns {*} - The result of the successful action that was passed in.
 */
const successHandler = ({action, result}) => {
    const log = new LogMarket(
        Status.Success.name,
        action=action,
        object=result,
        time=new Date(Date.now()).toISOString());
    log.write();
    return result;
}

/**
 * Returns a list of markets based on the given label and atributes to filter.
 * @async
 * @param {string} label - The label to search for markets.
 * @param {Array} filters - An array of filters to apply to the search.
 * @returns {Promise} - A promise that resolves to the list of markets that match the label and filters.
 *                      If no markets are found, the promise resolves to an empty array.
 *                      If an error occurs, the promise is rejected with the error object.
 */

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

/**
 * Returns a new object containing only the market-related information specified by the "marketColumns" constant.
 * @param {Object} info - The object containing the market information to be inserted.
 * @returns {Object} - A new object containing only the market-related information specified by the "marketColumns" constant.
*/
const insertionMarketInfo = info => {
    let newMarketInfo = {};
    CONSTANTS.marketColumns.forEach(column => {
        newMarketInfo[column] = info[column]
    })
    return newMarketInfo;
}

/**
 * Creates a new market based on the given information.
 * @async
 * @param {Object} info - The object containing the market information to be inserted.
 *                        If the creation is successful, the promise resolves to the new market object.
 *                        If an error occurs, the promise is rejected with the error object.
 * @returns {Promise} - A promise that resolves to the result of the market creation.
 */
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

/**
 * Updates an existing market with the given information.
 * @async
 * @param {String} registro - The registro of the current market information.
 * @param {Object} info - The object containing the new market information to update.
 * @returns {Promise} - A promise that resolves to the result of the market update.
 *                      If the update is successful, the promise resolves to the updated market object.
 *                      If an error occurs, the promise is rejected with the error object.
 */
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

/**
 * Deletes an existing market based on the given registro.
 * @async
 * @param {string} registro - The registro of the market to be deleted.
 * @returns {Promise} - A promise that resolves to the result of the market deletion.
 *                      If the deletion is successful, the promise resolves to the deleted market object.
 *                      If an error occurs, the promise is rejected with the error object.

 */
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
