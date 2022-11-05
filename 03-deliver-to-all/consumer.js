const amqplib = require('amqplib/callback_api');
const process = require('process')

const consumerId = `consumer-${process.pid}`
const queue = `deliver-to-all--${consumerId}`;
const exchange = "deliver-to-all-exchange"

console.log(`Consumer ID = ${consumerId}`)
console.log(`Queue = ${queue}`)

amqplib.connect('amqp://peter:bananasAreAwesome@localhost:5672', (err, conn) => {
    if (err) throw err;

    // Listener
    conn.createChannel((err, newChannel) => {
        if (err) throw err;

        newChannel.assertExchange(exchange, "direct", {durable: false})

        newChannel.assertQueue(queue);

        newChannel.bindQueue(queue, exchange, "all");

        newChannel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`${consumerId} =`, msg.content.toString());
                newChannel.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    });
});