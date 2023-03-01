module.exports = class Filter {
    static DISTRITO = new Filter('distrito')
    static REGIAO5 = new Filter('regiao5')
    static NOME_FEIRA = new Filter('nome_feira')
    static BAIRRO = new Filter('bairro')

    constructor(name) {
        this.name = name
    }
}
