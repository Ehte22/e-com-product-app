import amqp, { Channel, Connection } from "amqplib"
import dotenv from "dotenv"
import winston from "winston"
import { Product } from "../models/Product"
import { Types } from "mongoose"

dotenv.config()

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

let channel: Channel
let connection: Connection

export const PRODUCT_REQUEST = "PRODUCT_REQUEST";
export const PRODUCT_RESPONSE = "PRODUCT_RESPONSE";

const RabbitMQService = async () => {
    try {
        if (!process.env.RABBIT_MQ_URL) {
            throw new Error("Message broker URL is not defined in .env");
        }
        connection = await amqp.connect(process.env.RABBIT_MQ_URL)
        channel = await connection.createChannel()

        await channel.assertQueue(PRODUCT_REQUEST, { durable: true })
        await channel.assertQueue(PRODUCT_RESPONSE, { durable: true })

        ListenForProductRequest()

        logger.info("RabbitMQ connected successfully");

    } catch (err) {
        logger.error("Error initializing RabbitMQ:", err);
    }
}

const ListenForProductRequest = () => {
    channel.consume(PRODUCT_REQUEST, async (msg) => {
        if (msg && msg.content) {
            try {
                const { productIds } = JSON.parse(msg.content.toString())
                console.log(`msg received from ${PRODUCT_REQUEST}`, productIds);

                const products = await getProducts(productIds)

                channel.sendToQueue(
                    PRODUCT_RESPONSE,
                    Buffer.from(JSON.stringify(products)),
                    { correlationId: msg.properties.correlationId }
                )

                channel.ack(msg)
                console.log(`msg sent to ${PRODUCT_REQUEST}`);

            } catch (error) {
                console.error("Error processing message:", error)
                channel.nack(msg, false, false)
            }
        }
    })
}

const getProducts = async (productIds: string[]): Promise<any[]> => {
    const products = await Product.find({
        _id: { $in: productIds.map(id => new Types.ObjectId(id)) },
    });

    if (!products || products.length === 0) {
        throw new Error("No product found");
    }
    return products;
};


export { RabbitMQService, channel }