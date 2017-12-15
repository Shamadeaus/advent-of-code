module.exports = {
    run: (file) => {
        let layers = file.replace(/^\s+|\s+$/g, '').split('\n').reduce((p, v) => {
            let match = v.match(/\d+/g)
            return {
                ...p,
                [match[0]]: {
                    current: 0,
                    depth:  +match[1]-1,
                    down: true
                }
            }
        }, {})

        let layerTotal = Object.keys(layers)[Object.keys(layers).length-1]
        let seconds = 0
        let transform = (times, dudes) => {
            for (let i = 0; i < times; i++) {
                Object.keys(dudes).forEach(v => {
                    if (dudes[v].down) {
                        dudes[v].current++
                    } else {
                        dudes[v].current--
                    }
                    if (dudes[v].current === dudes[v].depth || dudes[v].current === 0) {
                        dudes[v].down = !dudes[v].down
                    }
                })
            }
        }
        let severity = 0
        let isCaught = false
        let cacheState = {}
        do {
            let newLayers
            if (Object.keys(cacheState).length) {
                transform(1, cacheState)
                newLayers = JSON.parse(JSON.stringify(cacheState))
            } else {
                newLayers = JSON.parse(JSON.stringify(layers))
                cacheState = JSON.parse(JSON.stringify(layers))
            }
            let caught = []
            for (let i = 0; i < +layerTotal+1; i++) {
                let layer = newLayers[i]
                if (layer) {
                    if (layer.current === 0) {
                        caught.push((+i * +(layer.depth+1)))
                    }
                }
                transform(1, newLayers)
            }
            seconds++
            console.log(seconds)
            if (caught.length) {
                severity = caught.reduce((t, v) => t + v)
                isCaught = true
            } else {
                isCaught = false
            }
        } while (isCaught)
        // part 1632

        // part 23834136
        //lol 1773.26s.


        // hard code while I solve part 2
        return `Part 1: ${severity}, Part 2: ${seconds-1}`
    }
}
