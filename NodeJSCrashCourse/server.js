const http = module.require('http')
const fs = module.require('fs')

const server = http.createServer((req, res) => {
    console.log('Request received')
    console.log(req.url, req.method)

    res.setHeader('Content-Type', 'text/html')

    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on localhost:3000')
})