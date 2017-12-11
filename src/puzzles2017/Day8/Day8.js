module.exports = {
    run: (file) => {
        let input = file.split('\n')
        let final = input.slice(0, input.length-1)
        let values = {}
        let highestValue = 0
        final.forEach(instruction => {
            let params = instruction.match(/^(\w+)\s(\w+)\s(-?\d+)\sif\s(\w+)\s((>|<|>=|==|<=|!=)\s-?\d+)$/m)

            let value2Change = params[1]
            let change = params[2]
            let changeAmount = +params[3]
            let value = params[4]
            let evalArgs = params[5]


            let foundValue2Change = values[value2Change] || 0
            let otherValue = values[value] || 0
            let test = `otherValue ${evalArgs}`

            if (eval(test)) {
                values[value2Change] = change === 'inc' ? foundValue2Change+changeAmount : foundValue2Change-changeAmount
                if (values[value2Change] > highestValue) {
                    highestValue = values[value2Change]
                }
            }
        })

        let sorted = Object.keys(values).map(v => ({[v]: values[v]})).sort((a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]])
        let max = JSON.stringify(sorted[sorted.length-1])
        // 8022

        return `Part 1: ${max}, Part 2: ${highestValue}`
    }
}
