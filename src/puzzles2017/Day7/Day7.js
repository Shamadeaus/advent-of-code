module.exports = {
    run: (file) => {
        let input = file.split('\n')
        let final = input.slice(0, input.length-1)
            .map(line => {
                let match = line.match(/[\w]+/g)
                let branch = match[0]
                let weight = match[1]
                let children = match.slice(2).reduce((p, v) => ({...p, [v]: {parent: branch}}), {})

                return {
                    branch,
                    weight,
                    children: {
                        ...children
                    }
                }
            })
            .map((tower, key, array) => {
                let find = array.find(value => Object.keys(value.children).find(child => child === tower.branch))
                if (find) {
                    tower.parent = find.branch
                    find.children[tower.branch] = tower
                }
                return tower
            })
        let part1 = final.find(node => !node.parent)
        // xegshds

        // Gave up and brute forced it
        let part2 = []
        let mainTowers = Object.keys(part1.children)
        let totals = mainTowers.map(child => sumChildren(part1.children[child], part2))
        let uniq = totals
            .map(branch => ({count: 1, name: branch}))
            .reduce((a, b) => {
                a[b.name] = (a[b.name] || 0) + b.count
                return a
            }, {})

        let duplicates = +Object.keys(uniq).filter((a) => uniq[a] > 1)[0]
        let badTower = totals.filter(total => total !== duplicates)[0]
        let badNode = part1.children[mainTowers[totals.indexOf(badTower)]]

        if (badTower > duplicates) {
            let change = badTower - duplicates
            part2.push(+badNode.weight - change)
        } else {
            let change = badTower.total + duplicates
            part2.push(+badNode.weight + change)
        }
        // 299

        return `Part 1: ${part1.branch}, Part 2: ${part2}`
    }
}

function sumChildren(node, part2) {
    let children = Object.keys(node.children)
    if (children[0]) {
        let values = children.map(child => sumChildren(node.children[child], part2))
        let balanceCheck = values.filter((value, index, self) => self.indexOf(value) === index).length < 2
        if (balanceCheck) {
            return values.reduce((total, num) => total + num) + +node.weight
        } else {
            let uniq = values
                .map(branch => ({count: 1, name: branch}))
                .reduce((a, b) => {
                    a[b.name] = (a[b.name] || 0) + b.count
                    return a
                }, {})
            let duplicates = +Object.keys(uniq).filter((a) => uniq[a] > 1)[0]
            let badTower = values.filter(total => total !== duplicates)[0]
            let badNode = node.children[children[values.indexOf(badTower)]]

            if (badTower > duplicates) {
                let change = badTower - duplicates
                part2.push(+badNode.weight - change)
            } else {
                let change = badTower.total + duplicates
                part2.push(+badNode.weight + change)
            }


            return values.reduce((total, num) => total + num) + +node.weight
        }
    } else {
        return +node.weight
    }
}

