
function PubSub() {
    return {
        events: {},

        subscribe(event, handler) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(handler);
        },

        unsubscribe(event, handler) {
            if (this.events[event]) {
                this.events[event] = this.events[event]?.filter(h => h !== handler);
            }
        },

        publish(event, args) {
            this.events[event]?.forEach((handler) => handler(args));
        }

        // subscribeAndAutoUnsubscribe(event, handler) {
        //     this.subscribe(event, new WeakRef(handler));
        // },

        // publish(event, args) { // WeakRef caused problems, sometimes items wouldn't render
        //     this.events[event]?.forEach((handler, index, self) => {
        //         if (handler instanceof WeakRef) {
        //             const actualHandler = handler.deref();
        //             if (actualHandler) actualHandler(args);
        //             else self.splice(index, 1);
        //             return;
        //         }
        //         handler(args);
        //     });
        // }
    }
}

export { PubSub }