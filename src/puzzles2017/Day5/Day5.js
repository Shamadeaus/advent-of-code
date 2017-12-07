module.exports = {
    run: (file) => {
        let input = file.split('\n').map(v => Number(v))
        let final1 = input.slice(0, input.length-1)
        let final2 = input.slice(0, input.length-1)

        let step1 = 0
        let position1 = 0
        while (final1[position1] !== undefined) {
            step1++
            if (final1[position1] === 0) {
                final1[position1]++
            } else {
                let old = final1[position1]
                final1[position1]++
                position1 = position1 + old
            }
        }
        // 339351

        let step2 = 0
        let position2 = 0
        while (final2[position2] !== undefined) {
            step2++
            if (final2[position2] === 0) {
                final2[position2]++
            } else {
                let old = final2[position2]
                if (old >= 3) {
                    final2[position2]--
                } else {
                    final2[position2]++
                }
                position2= position2 + old
            }
        }
        // 24315397

        return `Part 1: ${step1}, Part 2: ${step2}`
    }
}
