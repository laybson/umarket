const Filter = require('../enums/filter');

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

const validMarket = { id: 32, ...createInfo }

const auxValidMarket = { id: 32, registro: updateInfo.registro, ...updateInfo.info }

const multiMarkets = label => {
    const markets = Object.keys(Filter).map((filter, i) => {
        const info = createInfo;
        const market = {...info};
        market[filter.toLowerCase()] = label;
        market.distrito = filter;
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
