import { StudentHealth, VrClass, VrUser } from "../models/studentHealth";

export const getUser = (userId: number) => fetch(`https://${process.env.DB_SERVICES_HOST}/user/${userId}`).then(response => {
    if (response.ok) {
        console.log(`[Tracking][Database][User] Hydration Successful for ${userId}`);
    } else {
        console.log(`[Tracking][Database][User] Response code: ${response.status}`);
    }

    return response.json();
}).catch(error => {
    console.log(`[Tracking][Database][User] Error: ${error.message}`);
    return;
});

export const getClass = (classId: number) => fetch(`https://${process.env.DB_SERVICES_HOST}/class/${classId}`).then(response => {
    if (response.ok) {
        console.log(`[Tracking][Database][Class] Hydration Successful for ${classId}`);
    } else {
        console.log(`[Tracking][Database][Class] Response code: ${response.status}`);
    }

    return response.json();
}).catch(error => {
    console.log(`[Tracking][Database][Class] Error: ${error.message}`);
});

export const getClassTasks = (classId: number) => fetch(`https://${process.env.DB_SERVICES_HOST}/task/class/${classId}`).then(response => {
    if (response.ok) {
        console.log(`[Tracking][Database][Tasks] Task Ids retrieved successfully for ${classId}`);
    } else {
        console.log(`[Tracking][Database][Tasks] Task Ids Response code: ${response.status}`);
    }

    return response.json();
}).catch(error => {
    console.log(`[Tracking][Database][Tasks] Error: ${error.message}`);
});

export const fetchTotalActions = (classTasks: number[]) => fetch(`https://${process.env.DB_SERVICES_HOST}/action`, {
    method: 'POST',
    body: JSON.stringify(classTasks)
}).then(response => {
    if (response.ok) {
        console.log('[Tracking][Database][Actions] Actions amount retrieved successfully for the provided tasks');
    } else {
        console.log(`[Tracking][Database][Actions] Actions amount Response code: ${response.status}`);
    }
    return response.json();
}).catch(error => {
    console.log(`[Tracking][Event Store] Error: ${error.message}`);
});