module.exports = {
    run: (file) => {
        let input = file.split(/\s/).map(v => +v)
        let final = input.slice(0, input.length-1)

        let sorts = 0
        let lastPattern = ''
        let patterns = []

        do {
            let blocks = final.reduce((a, b) => Math.max(a, b))
            let pointer = final.indexOf(blocks)
            final[pointer] = 0

            for (let i = blocks; i > 0; i--) {
                if (pointer+1 > final.length-1) {
                    pointer = 0
                } else {
                    pointer++
                }
                final[pointer]++
            }
            lastPattern = final.join('')
            patterns.push(lastPattern)
            sorts++
        } while (patterns.filter(pattern => pattern === lastPattern).length < 2)
        // 11137

        console.log(lastPattern)
        console.log(patterns)
        let first = patterns.indexOf(patterns.find(pattern => pattern === lastPattern))
        let test = patterns.length - first


        return `Part 1: ${sorts}, Part 2: ${test-1}`
    }
}
