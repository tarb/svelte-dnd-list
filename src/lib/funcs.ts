
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

export function viewPortScroll(x: number, y: number, tolerance: number) {
    const height = window.innerHeight;
    const width = window.innerWidth;

    if (x < tolerance) {
        const dampening = (x / tolerance) * 10;
        window.scrollBy(-(10 - dampening), 0);
    } else if (x > (width-tolerance)) {
        const dampening = ((width - x) / tolerance) * 10;
        window.scrollBy(10 - dampening, 0);
    }

    if (y < tolerance) {
        const dampening = (y / tolerance) * 10;
        window.scrollBy(0, -(10 - dampening));
    } else if (y > (height-tolerance)) {
        const dampening = ((height - y) / tolerance) * 10;
        window.scrollBy(0, 10 - dampening);
    }
}