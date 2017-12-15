module.exports = {
    run: (file) => {
        let steps = file.replace(/^\s+|\s+$/g, '').split(',')
        let maxDistance = 0
        let calcDistance = (a, b) => (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
        let start = {x: 0, y: 0, z: 0}
        let currentPosition = {
            x: 0,
            y: 0,
            z: 0
        }

        let directions = {
            se: () => {
                currentPosition.y--
                currentPosition.x++
            },
            s: () => {
                currentPosition.y--
                currentPosition.z++
            },
            sw: () => {
                currentPosition.z++
                currentPosition.x--
            },
            ne: () => {
                currentPosition.x++
                currentPosition.z--
            },
            n: () => {
                currentPosition.y++
                currentPosition.z--
            },
            nw: () => {
                currentPosition.y++
                currentPosition.x--
            }
        }

        steps.forEach(step => {
            directions[step]()
            let newDistance = calcDistance(start, currentPosition)
            maxDistance = newDistance > maxDistance ? newDistance: maxDistance
        })
        let distance = calcDistance(start, currentPosition)
        // part 1 824

        // part 2 1548

        return `Part 1: ${distance}, Part 2: ${maxDistance}`
    }
}
