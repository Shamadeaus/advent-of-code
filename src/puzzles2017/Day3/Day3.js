module.exports = {
    run: (file) => {
        let input = Number(file.split('\n')[0])

        //TODO: not write garbage
        let wrungLastNumber1 = 1
        let wrung1 = 0
        let sidelength1 = 1
        while (wrungLastNumber1 < input) {
            wrung1++
            wrungLastNumber1 = wrungLastNumber1 + (wrung1 * 8)
            sidelength1 = sidelength1+2
        }

        let distanceToMiddles = Math.sqrt(wrung1 * 8)
        let bottomMiddle = wrungLastNumber1 - (sidelength1/2>>0)
        let leftMiddle = bottomMiddle - distanceToMiddles
        let topMiddle = leftMiddle - distanceToMiddles
        let rightMiddle = topMiddle - distanceToMiddles
        let middles = [bottomMiddle, leftMiddle, topMiddle, rightMiddle]

        let differences = middles.map(value => Math.abs(input - value))
        let middletoUse = Math.min(...differences)
        //475


        let storageRow = Array(30).fill('')
        let storage = Array(30).fill(storageRow)
        let startX = 14
        let startY = 14
        storage[startY][startX] = 1
        let currentLocation = {x: 15, y: 14}
        let currentValue = 0

        while (currentValue < input) {
            if (storage[currentLocation.y][currentLocation.x - 1]) {
                // Left

                // New Wrung
                if (!storage[currentLocation.y][currentLocation.x + 1] &&
                    !storage[currentLocation.y - 1][currentLocation.x] &&
                    !storage[currentLocation.y + 1][currentLocation.x]) {
                    if (storage[currentLocation.y - 1][currentLocation.x - 1]) {
                        storage[currentLocation.y][currentLocation.x] = storage[currentLocation.y - 1][currentLocation.x - 1] + storage[currentLocation.y][currentLocation.x - 1]
                    } else {
                        storage[currentLocation.y][currentLocation.x] = storage[currentLocation.y][currentLocation.x - 1]
                    }
                }
            } else if (storage[currentLocation.y][currentLocation.x + 1]) {
                // Right
            } else if (storage[currentLocation.y - 1][currentLocation.x]) {
                // Up
            } else if (storage[currentLocation.y + 1][currentLocation.x]) {
                // Down
            } else if (storage[currentLocation.y - 1][currentLocation.x - 1]) {
                // Left diagonal Up
            } else if (storage[currentLocation.y - 1][currentLocation.x + 1]) {
                // Right diagonal Up
            } else if (storage[currentLocation.y + 1][currentLocation.x - 1]) {
                // Left Diagonal Down
            } else if (storage[currentLocation.y + 1][currentLocation.x + 1]) {
                // Right Diagonal Down
            }
        }


        return `Part 1: ${middletoUse + wrung1}, Part 2: ${[]}`
    }
}

// function checkAdjacent() {
//
// }
