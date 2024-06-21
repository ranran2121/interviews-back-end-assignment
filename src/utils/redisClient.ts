import Redis from "ioredis";
import Redlock from "redlock";

// Initialize Redis clients
const redisClients = [new Redis({ port: 6379, host: "localhost" })];

// Initialize Redlock
const redlock = new Redlock(redisClients, {
  driftFactor: 0.01, // time in ms
  retryCount: 10,
  retryDelay: 200, // time in ms
  retryJitter: 200, // time in ms
});

export async function acquireLock(resource: string[], ttl: number) {
  try {
    const lock = await redlock.acquire(resource, ttl);

    console.log(`Lock acquired for resource: ${resource}`);

    return lock;
  } catch (e) {
    console.log("ERROR in acquiring locks", e);
  }
}

export async function releaseLock(lock: any) {
  await redlock.release(lock);
  console.log(`Lock released`);
}
