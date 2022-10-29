const amqplib = require('amqplib/callback_api');
const queue = 'bananas';

amqplib.connect('amqp://peter:bananasAreAwesome@localhost:5672', (err, conn) => {
    if (err) throw err;

    // Listener
    conn.createChannel((err, newChannel) => {
        if (err) throw err;

        newChannel.assertQueue(queue);

        newChannel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log("Consumer =", msg.content.toString());
                newChannel.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    });
});