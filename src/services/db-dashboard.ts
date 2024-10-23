import { StudentHealth } from "../models/studentHealth";

export const postStudentHealthToDashboardStore = (studentHealth: StudentHealth) => fetch(`https://${process.env.DB_DASHBOARD_HOST}`, {
    method: 'POST',
    body: JSON.stringify(studentHealth)
}).then(response => {
    if (response.ok) {
        console.log(`[Tracking][Database][Dashboard] Success for ${JSON.stringify(studentHealth)}`);
    } else {
        console.log(`[Tracking][Database][Dashboard] Response code: ${response.status}`);
    }
}).catch(error => {
    console.log(`[Tracking][Database][Dashboard] Error: ${error.message}`);
});