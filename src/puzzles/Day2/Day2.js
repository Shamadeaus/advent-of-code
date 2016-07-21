const _ = require('lodash')

module.exports = {
    run: (file) => {
        let part1 = 0
        let part2 = 0

        _.forEach(file.split('\n'), box => {
            let dimensions = box.split('x')

            let sorted = [Number(dimensions[0]), Number(dimensions[1]), Number(dimensions[2])].sort((a, b) => {return a-b})

            let s1 = 2*sorted[0]
            let s2 = 2*sorted[1]

            let squareFeet = (2*(Number(dimensions[0]) * Number(dimensions[1])))
                +(2*(Number(dimensions[1]) * Number(dimensions[2])))
                +(2*(Number(dimensions[2]) * Number(dimensions[0])))
                +(sorted[0] * sorted[1])

            let total = (s1+s2)+(Number(dimensions[0])* Number(dimensions[1])* Number(dimensions[2]))

            part1 = part1+squareFeet
            part2 = part2+total
        })

        return `Part 1: ${part1}, Part 2: ${part2}`
    }
}
