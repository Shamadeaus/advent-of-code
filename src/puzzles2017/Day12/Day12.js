module.exports = {
    run: (file) => {
        let connections = file.replace(/^\s+|\s+$/g, '').split('\n').reduce((p, v) => {
            let pipes = v.match(/\d+/g)
            return p.concat({[pipes.splice(0, 1)]: [...pipes]})
        }, [])

        let program = '0'
        let uniquePrograms = [program]

        let findConnections = program => {
            let programsToFind = connections[program][program].filter(v => !uniquePrograms.includes(v))
            uniquePrograms.push(...programsToFind)
            if (programsToFind.length) {
                programsToFind.forEach(v => findConnections(v))
            }
        }
        findConnections(program)
        // part 1 134

        let programsInGroups = []
        let uniqueToGroup = []
        let groups = 0
        let findConnections1 = program => {
            let programsToFind = connections[program][program].filter(v => !uniqueToGroup.includes(v))
            uniqueToGroup.push(...programsToFind)
            if (programsToFind.length) {
                programsToFind.forEach(v => findConnections1(v))
            }
        }

        connections.forEach((v, k) => {
            if (!programsInGroups.includes(`${k}`)) {
                uniqueToGroup.push(k)
                findConnections1(k)
                programsInGroups.push(...uniqueToGroup)
                groups++
                uniqueToGroup = []
            }
        })
        // 193

        return `Part 1: ${uniquePrograms.length}, Part 2: ${groups}`
    }
}
