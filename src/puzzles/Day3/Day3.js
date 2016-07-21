const fs = require('fs')
const _ = require('lodash')

module.exports = {
    part1: () => {
        let file = fs.readFileSync('src/puzzles/Day3/input.txt').toString()
        let houses = []

        let location = {
            x: 0,
            y: 0
        }

        file.split('').reduce((preValue, curValue) => {
            if(curValue === '^') {
                let north = _.cloneDeep(location)

                north.y++

                if (!_.some(houses, north)) {
                    houses.push(north)
                }

                location = north
            } else if (curValue === 'v') {
                let south = _.cloneDeep(location)

                south.y--

                if (!_.some(houses, south)) {
                    houses.push(south)
                }

                location = south
            } else if (curValue === '>') {
                let east = _.cloneDeep(location)

                east.x++

                if (!_.some(houses, east)) {
                    houses.push(east)
                }

                location = east
            } else if (curValue === '<') {
                let west = _.cloneDeep(location)

                west.x--

                if (!_.some(houses, west)) {
                    houses.push(west)
                }

                location = west
            }

        })

        return houses.length+1

    },
    part2: () => {
        let file = fs.readFileSync('src/puzzles/Day3/input.txt').toString()
        let houses = []

        let santaLocation = {
            x: 0,
            y: 0
        }

        let roboSantaLocation = {
            x: 0,
            y: 0
        }

        file.split('').reduce((preValue, curValue) => {
            if(curValue === '^') {
                let snorth = _.cloneDeep(santaLocation)
                let rsouth = _.cloneDeep(roboSantaLocation)

                snorth.y++
                rsouth.y--

                if (!_.some(houses, snorth)) {
                    houses.push(snorth)
                }
                if (!_.some(houses, rsouth)) {
                    houses.push(rsouth)
                }

                santaLocation = snorth
                roboSantaLocation = rsouth
            } else if (curValue === 'v') {
                let ssouth = _.cloneDeep(santaLocation)
                let rnorth = _.cloneDeep(roboSantaLocation)

                ssouth.y--
                rnorth.y++

                if (!_.some(houses, ssouth)) {
                    houses.push(ssouth)
                }
                if (!_.some(houses, rnorth)) {
                    houses.push(rnorth)
                }

                santaLocation = ssouth
                roboSantaLocation = rnorth
            } else if (curValue === '>') {
                let seast = _.cloneDeep(santaLocation)
                let rwest = _.cloneDeep(roboSantaLocation)

                seast.x++
                rwest.x--

                if (!_.some(houses, seast)) {
                    houses.push(seast)
                }
                if (!_.some(houses, rwest)) {
                    houses.push(rwest)
                }

                santaLocation = seast
                roboSantaLocation = rwest
            } else if (curValue === '<') {
                let swest = _.cloneDeep(santaLocation)
                let reast = _.cloneDeep(roboSantaLocation)

                swest.x--
                reast.x++

                if (!_.some(houses, swest)) {
                    houses.push(swest)
                }
                if (!_.some(houses, reast)) {
                    houses.push(reast)
                }

                santaLocation = swest
                roboSantaLocation = reast
            }
        })

        return houses.length+2
    }
}
