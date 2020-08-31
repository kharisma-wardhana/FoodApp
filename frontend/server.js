const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'prodiction';
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get('/resto/:id', (req, res) => {
            const actualPage = '/resto';
            const queryParams = { id: req.params.id };
            console.dir("req.params.id = " + JSON.stringify(req.params.id))
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res);
        })

        server.listen(3000, err => {
            if (err) throw err
            console.log('> Ready listen on http://localhost:3000');
        })
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })