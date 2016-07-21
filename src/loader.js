const fs = require('fs')

module.exports = {
    start: function (day) {
        let result = this.load(day)
        console.log(result)
    },
    load: function (day) {
        return require(`./puzzles/Day${day}/Day${day}`).run(fs.readFileSync(`src/puzzles/Day${day}/input.txt`).toString())
    }
}
