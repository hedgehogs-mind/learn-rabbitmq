const amqplib = require('amqplib/callback_api');
const exchange = "deliver-to-all-exchange"

amqplib.connect('amqp://peter:bananasAreAwesome@localhost:5672', (err, conn) => {
    if (err) throw err;

    // Sender
    conn.createChannel((err, newChannel) => {
        if (err) throw err;

        newChannel.assertExchange(exchange, "direct", {durable: false})

        setInterval(() => {
            newChannel.publish(exchange, "all", Buffer.from(`I will be delivered to all consumer instances! 🍌 (${new Date().toTimeString()})`));
        }, 2000);
    });
});