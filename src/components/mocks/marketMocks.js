const Filter = require('../enums/filter');

/**
 * Info to create a new Market mock.
 */
const createInfo = {
    long: 62185661,
    lat: 52479807,
    setcens: '355030885000091',
    areap: '3550308005040',
    coddist: 12,
    distrito: 'TRITO',
    codsubpref: 7,
    subprefe: 'Aeroclube',
    regiao5: 'Leste',
    regiao8: 'Leste 1',
    nome_feira: 'FEIRA DARPULGA',
    registro: 'S2_*-*',
    logradouro: 'Rua dos Bobos',
    numero: '0',
    bairro: 'ZEPA',
    referencia: 'Parque PB2'
}

/**
 * Info to update a new Market mock.
 */
const updateInfo = {
    registro: '<(**<)',
    info: {
        long: 127783809,
        lat: 26357896,
        setcens: '622202220602226',
        areap: '3550308005040',
        coddist: 113,
        distrito: 'TRITO',
        codsubpref: 8,
        subprefe: 'Ocaida',
        regiao5: 'Oeste',
        regiao8: 'Oeste 1',
        nome_feira: 'FEIRA DA PRATA',
        logradouro: 'Rua do fogo',
        numero: 'S/N',
        bairro: 'Pomo',
        referencia: 'Baixa da egua'
    }
}

/**
 * A valid market object.
 */
const validMarket = { id: 32, ...createInfo }

/**
 * Another valid market object.
 */
const auxValidMarket = { id: 32, registro: updateInfo.registro, ...updateInfo.info }

/**
 * Creates an array of markets with the given label for each available filter.
 * @param {string} label - The label to assign to each market.
 * @returns {Array} An array of markets, each containing the label and a specific filter value.
 */
const multiMarkets = label => {
    const markets = Object.keys(Filter).map((filter, i) => {
        const info = createInfo;
        const market = {...info};
        market[filter.toLowerCase()] = label;
        market.registro = filter;
        market.id = i;
        return market;
    })
    return markets;
}

module.exports = {
    createInfo,
    updateInfo,
    validMarket,
    auxValidMarket,
    multiMarkets
}
