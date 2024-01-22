module.exports = {
    getCurrentSemester: () => {
        const date = new Date()
        const month = date.getMonth()
        const year = date.getFullYear()

        if (month >= 8 && month <= 11) {
            return `f-${year}`
        } else if (month >= 0 && month <= 3) {
            return `w-${year}`
        } else {
            return `s-${year}`
        }
    },
    
}