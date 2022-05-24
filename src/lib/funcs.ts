
export function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = list.slice();
    const [removed] = result.splice(startIndex, 1);

    if (endIndex > result.length) {
        result.push(removed);
    } else {
        result.splice(endIndex, 0, removed);
    }

    return result;
}