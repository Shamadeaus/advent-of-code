module.exports = {
    run: (file) => {
        let input = file.replace(/^\s+|\s+$/g, '')

        let filledBits = 0
        let grid = []
        for(let i = 0; i <= 127; i++) {
            let result = hash(`${input}-${i}`)
            let val = dec2bin(result)
            grid.push(val.split(''))
            filledBits +=val.match(/[1]/g).length
        }
        let regions = calcRegionTotal(grid)

        return `Part 1: ${filledBits}, Part 2: ${regions}`
    }
}

function dec2bin(string){
    return string.split('').map(char => {
        let dec = parseInt(char, 16)
        return (dec >>> 0).toString(2).padStart(4, '0')
    }).join('')
}

function calcRegionTotal(grid) {
    let regions = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++){
            let result = calcRegion(grid, x, y)
            if (result) {
                regions++
            }
        }
    }
    return regions
}

function calcRegion(grid, x, y) {
    let adjacents = checkAnyAdjacent(grid, x, y)
    if ((grid[x][y] === 'x') || (grid[x][y] === '0')) {
        return false
    } else if (adjacents.length) {
        adjacents.forEach(dir => followRegion(grid, x, y, dir))
        return true
    } else {
        return true
    }

}

function checkAnyAdjacent(grid, x, y) {
    let north = grid[x] && grid[x][y+1] === '1' ? 'north' : 'nope'
    let south = grid[x] && grid[x][y-1] === '1' ? 'south' : 'nope'
    let east = grid[x+1] && grid[x+1][y] === '1' ? 'east' : 'nope'
    let west = grid[x-1] && grid[x-1][y] === '1' ? 'west' : 'nope'

    return [north, south, east, west].filter(val => val !== 'nope')
}

let directions = {
    north: (grid, x, y) => {
        grid[x][y+1] = 'x'
        let adjacents = checkAnyAdjacent(grid, x, y+1)
        if (adjacents.length) {
            adjacents.forEach(dir => followRegion(grid, x, y+1, dir))
        }
    },
    south: (grid, x, y) => {
        grid[x][y-1] = 'x'
        let adjacents = checkAnyAdjacent(grid, x, y-1)
        if (adjacents.length) {
            adjacents.forEach(dir => followRegion(grid, x, y-1, dir))
        }
    },
    east: (grid, x, y) => {
        grid[x+1][y] = 'x'
        let adjacents = checkAnyAdjacent(grid, x+1, y)
        if (adjacents.length) {
            adjacents.forEach(dir => followRegion(grid, x+1, y, dir))
        }
    },
    west: (grid, x, y) => {
        grid[x-1][y] = 'x'
        let adjacents = checkAnyAdjacent(grid, x-1, y)
        if (adjacents.length) {
            adjacents.forEach(dir => followRegion(grid, x-1, y, dir))
        }
    }
}

function followRegion(grid, x, y, dir) {
    directions[dir](grid, x, y)
}

//Day 10
function hash(row) {
    let newList = [...Array(256).keys()]
    let newCurrentPosition = 0
    let newSkipSize = 0
    let newInput = row.split('').map(v => v.charCodeAt(0)).concat(17, 31, 73, 47, 23)
    for (let i = 0; i < 64; i++) {
        newInput.forEach(length => {
            if ((newCurrentPosition + length) <= newList.length) {
                let subArray = newList.slice(newCurrentPosition, length+newCurrentPosition).reverse()
                newList.splice(newCurrentPosition, length, ...subArray)
            } else {
                let subArray1 = newList.slice(newCurrentPosition)
                let firstPart = subArray1.length
                let subArray2 = newList.slice(0, length - subArray1.length)
                let secondPart = subArray2.length
                let reverse = subArray1.concat(subArray2).reverse()
                newList.splice(newCurrentPosition, firstPart, ...reverse.splice(0, firstPart))
                newList.splice(0, secondPart, ...reverse)
            }

            let jump = length + newSkipSize
            newCurrentPosition = newCurrentPosition+jump
            if (newCurrentPosition > newList.length) {
                newCurrentPosition = newCurrentPosition % newList.length
            }
            newSkipSize++
        })
    }

    let denseHash = []
    while (newList.length) {
        let val = newList.splice(0, 16).reduce((total, num) => total ^ num, 0)
        denseHash.push(val.toString(16).padStart(2, '0'))
    }

    return denseHash.join('')
}

