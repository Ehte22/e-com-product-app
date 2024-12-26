import { channel } from "../services/rabbitMQ.service"

export const MessageConsumer = async (responseQueue: string, correlationId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!channel) {
            throw new Error("RabbitMQ channel is not initialized")
        }

        channel.consume(responseQueue, async (msg) => {
            if (msg && msg.content) {
                try {
                    const data = JSON.parse(msg.content.toString())

                    if (msg.properties.correlationId === correlationId) {
                        channel.ack(msg)
                        resolve(data)
                    } else {
                        channel.nack(msg, false, false)
                    }
                } catch (error) {
                    console.error('Error processing message', error);
                    channel.nack(msg, false, false);
                    reject(error);
                }
            }
        })
    })

}

