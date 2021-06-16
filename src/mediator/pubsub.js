
function PubSub() {
    return {
        events : {},

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
            this.events[event]?.forEach(handler => handler(args));
        }
    }
}

export {PubSub}