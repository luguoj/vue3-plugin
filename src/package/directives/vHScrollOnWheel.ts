import {Directive} from "vue";

export const vPsrHScrollOnWheel: Directive<HTMLDivElement, boolean | undefined> = {
    mounted(el, value) {
        if (value && el.classList.contains('el-scrollbar')) {
            const wrapRef = el.getElementsByClassName('el-scrollbar__wrap')[0]
            el.addEventListener('wheel', (e: WheelEvent) => {
                const wheelDelta = -e.deltaY / 100 * 120
                if (wheelDelta != 0) {
                    const target = Math.abs(wheelDelta)
                    const direction = wheelDelta / target
                    const step = 5
                    let current = 0
                    const scrolling = function () {
                        if (current + step < target) {
                            wrapRef.scrollLeft = wrapRef.scrollLeft - step * direction
                            current += step
                            setTimeout(scrolling, step)
                        } else {
                            wrapRef.scrollLeft = wrapRef.scrollLeft - (target - current) * direction
                        }
                    }
                    scrolling()
                }
                e.preventDefault()
            })
        }
    }
}