# PrismsEventConsumer

The application is an event consumer, which is intended to receive events from the message queue, and perform the following steps:
1. Send event info to long-term storage.
2. Check the cache for if a score exists (StudentHealth) for the event's student.
   a. If so, use the existing data to calculate the new score, and skip to step 6.
   b. If not, This is the first event for that student for that class; proceed through to calculate the new score based on just the new event.
3.  Hydrate StudentHealth details.
4.  Fetch score calculation details.
5.  Calculate new StudentHealth score.
6.  Update the score in redis.
7.  Send request to db/cache to store StudentHealth.

## Running `prisms-event-consumer` locally

- Run `npm i` to install all the packages.
- Run `npm start` will start the dev server.

Use postman to initiate an initial request as the following:
- Method: POST
- Body:

```
{
    "userId": 1,
    "applicationId": 1,
    "institutionId": 1,
    "classId": 1,
    "taskId": 1,
    "actionId": 1,
    "timeStamp": "timeStamp"
}
```

Note: a mock server is used (Mock Service Worker); the handlers are at root/mocks/handlers.ts

## Requirements

This application requires setting up redis on your local environment.
Follow the steps in the following document depending on your environment: https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/

## In Progress / Nice to haves

- Calculation Service
- Unit Testing
- Batch Event Processing
- Swagger
- Mock Server randomized responses

## System Design
![alt text](<system-design.jpg>)
