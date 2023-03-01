const db = require('../../db');
const CONSTANTS = require('../components/constants.js');
const { listToSeq, objToSeq } = require('../components/utils/toSeq');

const marketTable = CONSTANTS.marketTable;

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
