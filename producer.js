const amqp = require("amqplib");

const exchangeName = "exchangeName";
const [logtype, message] = process.argv.slice(2);

async function sendMsg() {
    const connection = await amqp.connect("amqp://'localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "direct");
    channel.publish(exchangeName, logtype, Buffer.from(message));
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 1000);
}

sendMsg();
