import { redisClient } from "../helpers/init_redis";

export const getCachedValue = (key) => redisClient.get(key).then(async (reply) => {
    console.log(`[Tracking][Redis][Get] Returning ${key}'s data: ${reply}`);
    return JSON.parse(reply);
}).catch((error) => {
    console.log(`[Tracking][Redis][Get] Error: ${error.message}`);
});

export const setValue = (key: string, value: string) => redisClient.set(key, value).then(async (reply) => {
    console.log(`[Tracking][Redis][Set] Set key: ${key}, value: ${value}`)
}).catch((error) => {
    console.log(`[Tracking][Redis][Set] Error: ${error.message}`);
});