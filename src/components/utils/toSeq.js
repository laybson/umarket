const listToSeq = (array) => {
    return `${array.map((_, i) => `$${i + 1}`).join(', ')}`
};

const objToSeq = (obj) => {
    return `${Object.keys(obj).map((o, i) => `${o} = $${i + 1}`).join(', ')}`
};

module.exports = {
    listToSeq,
    objToSeq
};
