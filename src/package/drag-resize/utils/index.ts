export function addEvents(events: Map<string, any>) {
    events.forEach((cb, eventName) => {
        document.documentElement.addEventListener(eventName, cb);
    });
}

export function removeEvents(events: Map<string, any>) {
    events.forEach((cb, eventName) => {
        document.documentElement.removeEventListener(eventName, cb);
    });
}



