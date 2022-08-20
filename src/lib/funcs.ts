
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

export function viewPortScroll(x: number, y: number, el: Element, scrollSpeed = 10): boolean {
    do {
        if (el === document.scrollingElement) {
            break;
        } else if (isScrollable(el)) {
            const b = el.getBoundingClientRect();
            const regionY = b.height / 3;
            const regionX = b.width / 3;
            let scrolled = false;

            if (y > b.top && y < (b.top + regionY) && el.scrollTop > 0) {
                const dampening = ((y - b.top) / regionY) * scrollSpeed;
                el.scrollTop -= (scrollSpeed - dampening);
                scrolled = true;
            } else if (y < b.bottom && y > (b.bottom - regionY) && (el.scrollTop + el.clientHeight) < el.scrollHeight) {
                const dampening = ((b.bottom - y) / regionY) * scrollSpeed;
                el.scrollTop += (scrollSpeed - dampening);
                scrolled = true;
            }

            if (x > b.left && x < (b.left + regionX) && el.scrollLeft > 0) {
                const dampening = ((x - b.left) / regionX) * scrollSpeed;
                el.scrollLeft -= (scrollSpeed - dampening);
                scrolled = true;
            } else if (x < b.right && x > (b.right - regionX) && (el.scrollLeft + el.clientWidth) < el.scrollWidth) {
                const dampening = ((b.right - x) / regionX) * scrollSpeed;
                el.scrollLeft += (scrollSpeed - dampening);
                scrolled = true;
            }

            if (scrolled) {
                return true;
            }
        }
    } while (el = el?.parentElement);

    return windowScroll(x, y, scrollSpeed);
}

function windowScroll(x: number, y: number, scrollSpeed = 10): boolean {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const regionY = height / 3;
    const regionX = width / 3;
    let scrolled = false;

    if (x < regionX && window.scrollX > 0) {
        const dampening = (x / regionX) * scrollSpeed;
        window.scrollBy(-(scrollSpeed - dampening), 0);
        scrolled = true;
    } else if (x > (width - regionX) && (window.scrollX + width) < document.scrollingElement.scrollWidth) {
        const dampening = ((width - x) / regionX) * scrollSpeed;
        window.scrollBy(scrollSpeed - dampening, 0);
        scrolled = true;
    }

    if (y < regionY && window.scrollY > 0) {
        const dampening = (y / regionY) * scrollSpeed;
        window.scrollBy(0, -(scrollSpeed - dampening));
        scrolled = true;
    } else if (y > (height - regionY) && (window.scrollY + height) < document.scrollingElement.scrollHeight) {
        const dampening = ((height - y) / regionY) * scrollSpeed;
        window.scrollBy(0, scrollSpeed - dampening);
        scrolled = true;
    }

    return scrolled;
}

function hasOverflowStyle(el: Element): boolean {
    const styles = getComputedStyle(el);
    return styles.overflowY === "scroll" || styles.overflowY === "auto" || styles.overflowX === "scroll" || styles.overflowX === "auto";
}

function isScrollable(el: Element): boolean {
    return el && (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) && hasOverflowStyle(el);
}