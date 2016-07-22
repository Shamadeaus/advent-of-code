const _ = require('lodash')

module.exports = {
    run: (file) => {
        let mover
        let santaPart1 = {
            lat: 0,
            lon: 0,
            houses: {}
        }

        let santaPart2 = _.cloneDeep(santaPart1)
        let roboSanta = _.cloneDeep(santaPart1)

        _.set(santaPart1.houses, `${santaPart1.lat}, ${santaPart1.lon}`, 1)
        _.set(santaPart2.houses, `${santaPart2.lat}, ${santaPart2.lon}`, 1)
        _.set(roboSanta.houses, `${roboSanta.lat}, ${roboSanta.lon}`, 1)

        _.forEach(file.split(''), (curValue, index) => {
            index % 2 === 1 ? mover = roboSanta : mover = santaPart2

            if (curValue === '^') {
                santaPart1.lat++
                mover.lat++
            } else if (curValue === 'v') {
                santaPart1.lat--
                mover.lat--
            } else if (curValue === '>') {
                santaPart1.lon++
                mover.lon++
            } else if (curValue === '<') {
                santaPart1.lon--
                mover.lon--
            }

            _.set(santaPart1.houses, `${santaPart1.lat}, ${santaPart1.lon}`, 1)
            _.set(mover.houses, `${mover.lat}, ${mover.lon}`, 1)
        })

        return `Part 1: ${_.size(santaPart1.houses)}, Part 2: ${_.size(_.merge(santaPart2.houses, roboSanta.houses))}`

    }
}