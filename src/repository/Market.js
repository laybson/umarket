const db = require('../../db');
const CONSTANTS = require('../components/constants.js');
const { listToSeq, objToSeq } = require('../components/utils/toSeq');

const marketTable = CONSTANTS.marketTable;

/**
 * Retrieves data from the market table filtered by the provided label and attribute.
 * @async
 * @function
 * @param {Object} params - The parameters for filtering the data.
 * @param {string} params.label - The label to be used for filtering.
 * @param {string} params.filter - The attribute to be used for filtering.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of objects representing the filtered data.
 */
const getByFilter = ({ label, filter }) => {
    return new Promise((acc, rej) => {
        db.query(
            `SELECT * FROM ${marketTable} WHERE LOWER(${filter}) = LOWER($1)`,
            [label],
            (error, results) => {
                if (error) rej(error);
                acc(results.rows);
            }
        );
    })
}

/**
 * Creates a new record in the market table using the provided information.
 * @async
 * @function
 * @param {Object} info - The information to be used for creating the record.
 * @returns {Promise<Object>} A Promise that resolves to an object representing the created record.
 */
const create = async info => {
    return new Promise((acc, rej) => {
        db.query(
            `INSERT INTO ${marketTable} (${Object.keys(info).join(', ')}) VALUES (${listToSeq(Object.keys(info))})`,
            Object.values(info),
            (error, results) => {
                if (error) rej(error);
                acc(info);
            }
        );
    });
}

/**
 * Updates a record in the market table with the provided information.
 * @async
 * @function
 * @param {string} registro - The registro of the record to be updated.
 * @param {Object} info - The information to be used for updating the record.
 * @returns {Promise<Object>} A Promise that resolves to an object representing the updated record.
 */
const update = async (registro, info) => {
    return new Promise((acc, rej)=> {
        db.query(
            `UPDATE ${marketTable} SET ${objToSeq(info)} WHERE registro = '${registro}'`,
            Object.values(info),
            (error, results) => {
                if (error) rej(error);
                acc(info); 
            }
        );
    });
}

/**
 * Deletes a record from the market table with the provided registro.
 * @async
 * @function
 * @param {string} registro - The registro of the record to be deleted.
 * @returns {Promise<Object>} A Promise that resolves to an object representing the deleted record.
 */
const deleteMarket = async registro => {
    return new Promise((acc, rej)=> {
        db.query(
            `DELETE FROM ${marketTable} WHERE registro = '${registro}'`,
            (error, results) => {
                if (error) rej(error);
                acc(results);
            }
        );
    });
}

module.exports = {
    getByFilter,
    create,
    update,
    deleteMarket,
};
