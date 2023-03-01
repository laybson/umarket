const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const server = express();
const port = 3000;

server.use(express.json());

server.get('/api/v1', (req, res) => {
    res.send(`
        <p>
            <head>
                uMarket!
            </head>
            <body>
                <p>
                    Talvez hoje você não se interesse por dados das feiras livres de São Paulo no ano de 2014.
                </p>
                <p>
                    Mas amanhã, talvez? (ʘ ͜ʖ ʘ)
                </p>
            </body> 
        </p>
    `)
})

server.use('/api/v1', routes);
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});