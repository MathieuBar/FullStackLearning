const fs = module.require('fs')

// read file
let filePath = './docs/blog1.txt'
if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data.toString())
    })
} else {
    console.log(`file ${filePath} does not exist`)
}

// write file
filePath = './docs/blog2.txt'
fs.writeFile(filePath, 'Hello again', (err) =>{
    if (err) {
        console.log(err)
    }
})
console.log(`file ${filePath} created`)

// create dir
const dirPath = './assets'
if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, () => {
        console.log(`directory ${dirPath} created`)
    })
} else {
    console.log(`directory ${dirPath} already exists`)
}

// delete dir
if (fs.existsSync(dirPath)) {
    fs.rmdir(dirPath ,(err) => {
        if (err) {
            console.log(err)
        }
        console.log(`directory ${dirPath} deleted`)
    })
}

// remove file
filePath = './docs/blog2.txt'
if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(`file ${filePath} deleted`)
    })
}
