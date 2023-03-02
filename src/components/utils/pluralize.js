/**
 * Pluralizes a string adding given chars as suffix in case of multiplicity.
 * @param {string} singular - The singular string.
 * @param {string} count - Incidences count.
 * @param {string} pluralChar - Char to be added.
 * @returns {Array} An array of markets, each containing the label in a specific filter value.
 */
module.exports = ({ singular, count, pluralChar = 's' }) => {
    let output = singular;

    if (count !== 1) output = `${singular}${pluralChar}`;

    return output;
};
