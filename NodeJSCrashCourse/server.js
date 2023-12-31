const http = module.require('http')
const fs = module.require('fs')
const _ = module.require('lodash')

const server = http.createServer((req, res) => {
    const num = _.random(0, 20)
    console.log(num)

    const greet = _.once(() => {
        console.log("hello")
    })
    greet()
    greet()

    res.setHeader('Content-Type', 'text/html')

    let path = './views/'
    switch (req.url) {
        case '/': 
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-me':
            res.setHeader('Location', '/about')
            res.statusCode = 301
            res.end()
            return
        default:
            res.statusCode = 404
            path += '404.html'
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.end()
        } else {
            res.end(data)
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on localhost:3000')
})