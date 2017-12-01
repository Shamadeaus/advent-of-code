const fs = require('fs')

module.exports = {
    start: function (year, day) {
        let result = this.load(year, day)
        console.log(result)
    },
    load: function (year, day) {
        return require(`./puzzles${year}/Day${day}/Day${day}`).run(fs.readFileSync(`src/puzzles${year}/Day${day}/input.txt`).toString())
    }
}
