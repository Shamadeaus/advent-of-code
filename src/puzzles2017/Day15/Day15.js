module.exports = {
    run: (file) => {
        let input = file.replace(/^\s+|\s+$/g, '').split('\n')
        let genA = +input[0]
        let genB = +input[1]
        let factorA = 16807
        let factorB = 48271
        let divide = 2147483647
        let match = 0
        let aValues = []
        let bValues =[]

        while (aValues.length < 5000000) {
            let val1 = (genA * factorA) % divide
            genA = val1

            if (val1 % 4 === 0) {
                val1 = val1 & 0xFFFF
                aValues.push(val1)
            }
        }


        while (bValues.length < 5000000) {
            let val2 = (genB * factorB) % divide
            genB = val2

            if (val2 % 8 === 0) {
                val2 = val2 & 0xFFFF
                bValues.push(val2)
            }
        }

        for (let z = 0; z < aValues.length; z++) {
            if (aValues[z] === bValues[z]) {
                match++
            }
        }




        return `Part 1: ${match}, Part 2: ${[]}`
    }
}

