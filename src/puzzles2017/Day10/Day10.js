module.exports = {
    run: (file) => {
        let input = file.replace(/^\s+|\s+$/g, '').split(',').map(v => +v)
        let currentPosition = 0
        let skipSize = 0
        let list = [...Array(256).keys()]

        input.forEach(length => {
            if ((currentPosition + length) < list.length) {
                let subArray = list.slice(currentPosition, length+currentPosition).reverse()
                list.splice(currentPosition, length, ...subArray)
            } else {
                let subArray1 = list.slice(currentPosition)
                let firstPart = subArray1.length
                let subArray2 = list.slice(0, length - subArray1.length)
                let secondPart = subArray2.length
                let reverse = subArray1.concat(subArray2).reverse()
                list.splice(currentPosition, firstPart, ...reverse.splice(0, firstPart))
                list.splice(0, secondPart, ...reverse)
            }

            let jump = length + skipSize
            currentPosition = currentPosition+jump
            if (currentPosition > list.length) {
                currentPosition = currentPosition % list.length
            }
            skipSize++
        })
        let firstTwo = list[0] * list[1]
        //2928

        let newList = [...Array(256).keys()]
        let newCurrentPosition = 0
        let newSkipSize = 0
        let newInput = file.replace(/^\s+|\s+$/g, '').split('').map(v => v.charCodeAt(0)).concat(17, 31, 73, 47, 23)
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

        return `Part 1: ${firstTwo}, Part 2: ${denseHash.join('')}`
    }
}
