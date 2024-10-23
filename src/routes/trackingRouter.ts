import express, { Request, Response } from "express";
import { calculateStudentScore } from "../helpers/common";
import { VrEvent } from "../models/event";
import { StudentHealth, VrClass, VrUser } from "../models/studentHealth";
import { postStudentHealthToDashboardStore } from "../services/db-dashboard";
import { getClass as fetchClass, getClassTasks as fetchClassTasks, fetchTotalActions, getUser as fetchUser } from "../services/db-services";
import { postEventToEventStore } from "../services/event-store";
import { getCachedValue as getCacheValue, setValue as setCacheValue } from "../services/redis";

const trackingRouter = express.Router();

trackingRouter.post('/', async (req: Request, res: Response) => {
    try {
        const event: VrEvent = req.body;

        // 1. send event info to long-term storage
        await postEventToEventStore(event);

        let studentHealth: StudentHealth = await getCacheValue(event.userId.toString());

        if (!!studentHealth && studentHealth.classId == event.classId) {
            // use the existing data along with the new event to calculate the new score
            studentHealth.completedActions++;
            studentHealth.score = calculateStudentScore(studentHealth.completedActions, studentHealth.totalActions);
        } else {
            // This is the first event for that student for that class
            // calculate the new score based on just the new event
            studentHealth = {
                userId: event.userId,
                classId: event.classId
            }

            // 2. Hydration of StudentHealth details
            const vrUser: VrUser = await fetchUser(studentHealth.userId);
            studentHealth.firstName = vrUser.firstName;
            studentHealth.lastName = vrUser.lastName; 

            const vrClass: VrClass = await fetchClass(studentHealth.classId);
            studentHealth.className = vrClass.className;

            // 3. Calculate new StudentHealth score
            const classTasks: number[] = await fetchClassTasks(studentHealth.classId);

            const totalActions: number = await fetchTotalActions(classTasks);

            studentHealth.completedActions = 1;
            studentHealth.totalActions = totalActions;
            studentHealth.score = calculateStudentScore(studentHealth.completedActions, studentHealth.totalActions);
        }

        // 4. Update the score in redis
        await setCacheValue(String(studentHealth.userId), JSON.stringify(studentHealth));

        // 5. send request to db/cache to store student health
        await postStudentHealthToDashboardStore(studentHealth);

        res.sendStatus(200);
    } catch (error) {
        console.log(`[Tracking][Try-Catch] Error: ${error.message}`);
        res.sendStatus(500);
    }

});

export { trackingRouter };
