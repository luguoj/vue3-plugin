import {ScrollbarInstance} from "element-plus";

export function handleHorizontalScrollingOnWheel(elScrollbar: ScrollbarInstance) {
    (elScrollbar.$el as HTMLElement).addEventListener('wheel', (e: WheelEvent) => {
        const wheelDelta = -e.deltaY / 100 * 120
        if (elScrollbar.wrapRef && wheelDelta != 0) {
            const wrapRef = elScrollbar.wrapRef
            const target = Math.abs(wheelDelta)
            const direction = wheelDelta / target
            const step = 5
            let current = 0
            const scrolling = function () {
                if (current + step < target) {
                    elScrollbar.setScrollLeft(wrapRef.scrollLeft - step * direction)
                    current += step
                    setTimeout(scrolling, step)
                } else {
                    elScrollbar.setScrollLeft(wrapRef.scrollLeft - (target - current) * direction)
                }
            }
            scrolling()
        }
        e.preventDefault()
    })
}