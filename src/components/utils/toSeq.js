/**
 * Returns a sequence string representing the provided array, to aux postgres queries.
 * @param {Array} array - The array to be converted to a sequence string.
 * @returns {string} A sequence string representing the provided array.
 */
const listToSeq = (array) => {
    return `${array.map((_, i) => `$${i + 1}`).join(', ')}`
};

/**
 * Returns a sequence string representing the provided object, to aux postgres update queries.
 * @param {Object} obj - The object to be converted to a sequence string.
 * @returns {string} A sequence string representing the provided object.
 */
const objToSeq = (obj) => {
    return `${Object.keys(obj).map((o, i) => `${o} = $${i + 1}`).join(', ')}`
};

module.exports = {
    listToSeq,
    objToSeq
};
