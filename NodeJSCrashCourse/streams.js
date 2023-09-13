fs = module.require('fs')

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./docs/blog4.txt')

//readStream.pipe(writeStream)

readStream.on('data', (chunk) => {
    writeStream.write('\n ------- NEW CHUNK -------\n')
    writeStream.write(chunk)
})
