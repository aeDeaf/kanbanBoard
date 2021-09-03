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

export function base64toBlob(base64Data) {
    let sliceSize = 1024;
    let byteCharacters = atob(base64Data);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);

        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays);
}


