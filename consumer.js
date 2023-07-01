const amqp = require("amqplib");

const exchangeName = "exchangeName";
const logtypes = process.argv.slice(2);

async function getMsg() {
    const connection = await amqp.connect("amqp://'localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "direct");
    const assertedQueue = await channel.assertQueue("", { exclusive: true });
    for (const pattern of logtypes) {
        channel.bindQueue(assertedQueue.queue, exchangeName, pattern);
    }
    channel.consume(assertedQueue.queue, (msg) => {
        console.log(msg);
        channel.ack(msg);
    });
}

getMsg();
