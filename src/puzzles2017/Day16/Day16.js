module.exports = {
    run: (file) => {
        // P1 glnacbhedpfjkiom
        // P2 fmpanloehgkdcbji
        const spin = amount => {
            let start = programs.length - amount
            let elements = programs.splice(start, amount)
            programs.splice(0, 0, ...elements)
        }
        const exchange = (p1, p2) => {
            let val1 = programs[p1]

            programs[p1] = programs[p2]
            programs[p2] = val1
        }
        const partner = (char1, char2) => {
            let p1 = programs.find(char => char === char1)
            let p1pos = programs.indexOf(p1)
            let p2 = programs.find(char => char === char2)
            let p2pos = programs.indexOf(p2)

            programs[p1pos] = p2
            programs[p2pos] = p1
        }
        let programs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']
        let instructions = file.replace(/^\s+|\s+$/g, '').split(',')

        let time = 0
        while (time < 40) {
            instructions.forEach(instruction => {
                let match = instruction.match(/([spx])(\d+|\w)\/?(\d+|\w)?/)

                if (!match[3]) {
                    spin(+match[2])
                } else if (match[1] === 'x') {
                    exchange(+match[2], +match[3])
                } else if (match[1] === 'p') {
                    partner(match[2], match[3])
                }
            })
            time++
        }

        return `Part 1: ${programs.join('')}, Part 2: ${[]}`
    }
}
