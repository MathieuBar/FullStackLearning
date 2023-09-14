const http = module.require('http')

const server = http.createServer((req, res) => {
    console.log('Request received')
})

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on localhost:3000')
})