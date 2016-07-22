const _ = require('lodash')

module.exports = {
    run: (file) => {
        let nice1 = 0
        let nice2 = 0
        let naughty = 0

        _.forEach(file.split('\n'), name => {
            let result = name.match(/[aeiou]/g)
            result && result.length >= 3 && name.match(/(.)\1/) && !name.match(/(ab|cd|pq|xy)/) ? nice1++ : naughty++

            name.match(/(..).*\1/) && name.match(/(.).\1/) ? nice2++ : naughty++
        })

        return `Part 1: ${nice1}, Part 2: ${nice2}`
    }
}
