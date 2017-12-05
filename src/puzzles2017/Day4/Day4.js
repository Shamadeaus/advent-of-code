module.exports = {
    run: (file) => {
        let count1 = 0
        let count2 = 0
        let input = file.split('\n')
        let final = input.slice(0, input.length-1)

        final.map(passPhrase => {
            let match = passPhrase.match(/(\b\w+\b)(?!.*\b\1\b)/g)
            if (match && match.length === passPhrase.split(/\s/).length) {
                count1++
            }
        })
        // 337

        final.map(passPhrase => {
            let match = passPhrase.match(/(\b\w+\b)(?!.*\b\1\b)/g)
            if (match.length) {
                match = match.map(mat => mat.split('').sort().join('')).filter((value, index, self) => self.indexOf(value) === index)
                if (match.length === passPhrase.split(/\s/).length) {
                    count2++
                }
            }
        })
        //231



        return `Part 1: ${count1}, Part 2: ${count2}`
    }
}
