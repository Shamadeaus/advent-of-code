const md5 = require('md5')

module.exports = {
    run: (file) => {
        let part1 = 0
        let part2 = 0
        let result = ''

        while (!result.startsWith('00000')) {
            result = md5(file+part1++)
        }

        while (!result.startsWith('000000')) {
            result = md5(file+part2++)
        }

        return `Part 1: ${part1-1}, Part 2: ${part2-1}`
    }
}
