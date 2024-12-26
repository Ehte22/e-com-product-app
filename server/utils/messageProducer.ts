import { channel } from "../services/rabbitMQ.service";

export const PRODUCER = async (requestQueue: string, data: any, correlationId: string) => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized")
    }

    await channel.assertQueue(requestQueue, { durable: true })
    channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify(data)), {
        correlationId,
        persistent: true
    })

    console.log(`Message sent to queue ${requestQueue}`);
}