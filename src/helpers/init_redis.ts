import * as redis from "redis";

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
export const redisClient = redis.createClient({
    url: redis_url,
    socket: {
      tls: (redis_url.match(/rediss:/) != null),
      rejectUnauthorized: false,
    }
});

(async () => {
    await redisClient.connect();
})();

redisClient.on('connect', () => {
    console.log("Client connected to redis and ready to use...");
});

redisClient.on('error', (err) => {
    console.log(err.message);
});

redisClient.on('end', () => {
    console.log("Client disconnected from redis");
});

process.on('SIGINT', () => {
    redisClient.quit();
});
