export function immutablePop(array) {
    return [array[array.length - 1], array.slice(0, -1)];
}

export function immutablePush(array, newItem) {
    return [...array, newItem];
}

export function immutableUpdateByIndex(array, updateIndex, updatedItem) {
    return array.map((item, index) => {
        if(index !== updateIndex)
        {
            return item;
        }

        return updatedItem;
    });
}