module.exports = {
    run: (file) => {
        let input = file.split('\n')
        let final = input.slice(0, input.length-1)

        let result1 = final.map(value => {
            let rowValues = value.split('\t')
                .map(v => Number(v))
                .filter(v => v)
                .sort((a, b) => a - b)
            return rowValues[rowValues.length-1] - rowValues[0]
        }).reduce((total, num) => total + num)
        //44887

        let rowAnswer = []
        final.map(value => {
            let rowValues = value.split('\t')
                .map(v => Number(v))
                .filter(v => v)

            let location = 0
            let stop = false
            while (location < rowValues.length || !stop) {
                let value = rowValues[location]
                for (let i = 0; i < rowValues.length; i++) {
                    if (rowValues[i] !== value) {
                        let divisible = rowValues[i] / value
                        if ((divisible % 1) === 0) {
                            rowAnswer.push(divisible)
                            stop = true
                        }
                    }
                }
                location++
            }
        })
        let result2 = rowAnswer.reduce((total, num) => total + num)
        //242

        return `Part 1: ${result1}, Part 2: ${result2}`
    }
}
