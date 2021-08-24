export function takeInitials(name) {
    const splitName = name.split(' ')
    if (splitName.length > 1) {
        return splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
    } else {
        return splitName[0][0].toUpperCase() + splitName[0][1].toUpperCase()
    }
}

export function isEmpty(str) {
    return (!str || str.length === 0 );
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


