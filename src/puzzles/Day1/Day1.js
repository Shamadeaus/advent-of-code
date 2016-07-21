const _ = require('lodash')

module.exports = {
    run: (file) => {
        let result = 0
        let basementVisits = []

        _.forEach(file.split(''), (paren, index) =>  {
            if (paren === '(') {
                result++
            } else {
                result--
                if (result === -1) {
                    basementVisits.push(index)
                }
            }
        })

        return `Part 1: ${result}, Part 2: ${basementVisits[0]+1}`
    }
}