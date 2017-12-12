let currentOpenGroups = 0
let currentOpenGarbage = 0
let total = 0
let totalGarbageChars = 0

module.exports = {
    run: (file) => {
        let input = file.replace(/^\s+|\s+$/g, '').split('')
        for (let i = 0; i < input.length; i++) {
            let val = input[i]
            let chars = {
                '<': val => garbage(val),
                '>': val => garbage(val),
                '{': val => group(val),
                '}': val => group(val),
                '!': () => i = i+1
            }

            if (currentOpenGarbage && (val !== '>') && (val !== '!')) {
                totalGarbageChars++
            } else if (chars[val]) {
                chars[val](val)
            }
        }

        return `Part 1: ${total}, Part 2: ${totalGarbageChars}`
    }
}

function garbage(val) {
    if (currentOpenGarbage === 0 && val === '<') {
        currentOpenGarbage++
    } else if (currentOpenGarbage > 0 && val === '>') {
        currentOpenGarbage--
    }
}

function group(val) {
    if (currentOpenGarbage === 0 && val === '{') {
        currentOpenGroups++
    } else if (currentOpenGarbage === 0 && val === '}') {
        total += currentOpenGroups
        currentOpenGroups--
    }
}
