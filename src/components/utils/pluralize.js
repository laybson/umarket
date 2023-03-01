module.exports = ({ singular, count, pluralChar = 's' }) => {
    let output = singular;

    if (count !== 1) output = `${singular}${pluralChar}`;

    return output;
};
