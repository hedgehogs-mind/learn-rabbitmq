const amqplib = require('amqplib/callback_api');
const queue = 'only-once';

amqplib.connect('amqp://peter:bananasAreAwesome@localhost:5672', (err, conn) => {
    if (err) throw err;

    // Sender
    conn.createChannel((err, newChannel) => {
        if (err) throw err;

        newChannel.assertQueue(queue);

        setInterval(() => {
            newChannel.sendToQueue(queue, Buffer.from(`I will be delivered only once! 🍌 (${new Date().toTimeString()})`));
        }, 2000);
    });
});