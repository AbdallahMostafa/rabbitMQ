const amqp = require("amqplib");

connect();

async function connect(){
    try {
        const amqpServer = "amqp server";
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recived job with input ${input.number}`);
            // testing ack
            // TODO
            // DeQueue the topic from the queue
            if (input.number == 7)
                channel.ack(message);
        });
        console.log("waiting for messages...");
    } catch (error) {
        console.error(error);
    }
}