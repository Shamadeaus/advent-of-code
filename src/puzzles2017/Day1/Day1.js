module.exports = {
    run: (file) => {
        let input = file.split('')
        let final = input.slice(0, input.length-1)

        let matchingValues = final.map((value, key) => {
            if (value === final[key+1]) {
               return Number(value)
            }
        }).filter(v => v)

        if (final[final.length - 1] === final[0]) {
            matchingValues.push(Number(final[final.length - 1]))
        }
        let result = matchingValues.reduce((total, num) => total + num)
        //1251

        let matchingNumber = final.length / 2
        let part2Values = final.map((value, key) => {
            if (final[key+matchingNumber]) {
                if (value === final[key+matchingNumber]) {
                    return Number(value)
                }
            } else {
                let calcWrap = (key + matchingNumber) - final.length
                if (value === final[calcWrap]) {
                    return Number(value)
                }
            }
        })
            .filter(v => v)
            .reduce((total, num) => total + num)
        //1244

        return `Part 1: ${result}, Part 2: ${part2Values}`
    }
}
