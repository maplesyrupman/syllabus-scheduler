function deepEqual(obj1:any, obj2:any) {
    // If they are the same object, return true
    if (obj1 === obj2) {
        return true;
    }

    // If they are not both objects, they are not equal
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    // If they have different number of keys, they are not equal
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

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
    addToArraySet: (obj: any, set: any[]) => {
        if (!set.some(item => deepEqual(item, obj))) {
            set.push(obj);
        }
    }
}
