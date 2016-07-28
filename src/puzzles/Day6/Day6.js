const _ = require('lodash')

module.exports = {
    run: (file) => {
        let part1 = 0
        let part2 = 0
        let grid = {}
        _.forEach(file.split('\n'), instruction => {
            if (instruction.startsWith('turn on')) {
                let results = instruction.match(/(\d+)/g)
                for (var i = +results[0]; i <= +results[2]; i++) {
                    for (var j = +results[1]; j <= +results[3]; j++) {
                        let value = 0
                        _.get(grid, `${i}, ${j}`) ? value = _.get(grid, `${i}, ${j}`).bright+=1 : value+=1
                        _.set(grid, `${i}, ${j}`, {on: true, bright: value})
                    }
                }
            } else if (instruction.startsWith('turn off')) {
                let results = instruction.match(/(\d+)/g)
                for (var i = +results[0]; i <= +results[2]; i++) {
                    for (var j = +results[1]; j <= +results[3]; j++) {
                        let value = 0
                        if (_.get(grid, `${i}, ${j}`)) {
                            value = _.get(grid, `${i}, ${j}`).bright
                        }
                        if (value > 0) {
                            value-=1
                        }
                        _.set(grid, `${i}, ${j}`, {on: false, bright: value})
                    }
                }
            } else if (instruction.startsWith('toggle')) {
                let results = instruction.match(/(\d+)/g)
                for (var i = +results[0]; i <= +results[2]; i++) {
                    for (var j = +results[1]; j <= +results[3]; j++) {
                        let value
                        let on

                        if (_.get(grid, `${i}, ${j}`)) {
                            value = _.get(grid, `${i}, ${j}`).bright+=2
                            on = _.get(grid, `${i}, ${j}`).on
                        } else {
                            value = 0
                            value+=2
                            on = undefined
                        }
                        _.set(grid, `${i}, ${j}`, {on: !on, bright: value})
                    }
                }
            }
        })
        let array = []
        _.forEach(grid, light => {
            if (light.on === true) {
                part1+=1
            }
            array.push(light.bright)
        })

        part2 = _.sum(array)

        return `Part 1 ${part1}, Part 2 ${part2}`
    }
}
