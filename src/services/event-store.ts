import { VrEvent } from "../models/event";

export const postEventToEventStore = (event: VrEvent) => fetch(`https://${process.env.EVENT_STORE_HOST}`, {
    method: 'POST',
    body: JSON.stringify(event)
}).then(response => {
    if (response.ok) {
        console.log(`[Tracking][Event Store] Success`);
    } else {
        console.log(`[Tracking][Event Store] Response code: ${response.status}`);
    }
}).catch(error => {
    console.log(`[Tracking][Event Store] Error: ${error.message}`);
});