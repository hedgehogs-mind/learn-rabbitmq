# 01 Simple Queue

The goal was to get familiar with RabbitMQ.

- I created a node project (using yarn).
- I created a **producer** file (`producer.js`).
- I created a **consumer** file (`consumer.js`).

# What did I learn?

- Running **RabbitMQ via docker**.
- Using the **npm library `amqplib`**, to
  - **create channels**
  - **send messages** via a channel to a queue
  - **receive messages** via a channel from a queue
- **How simple sending messages is** with RabbitMQ.

# Questions that came up

What is a channel specifically? How is it different from a queue?
> There is no direct relation between Channel and Queue. A Channel is used to send AMQP commands to the broker. This can be the creation of a queue or similar, but these concepts are not tied together.

How is a channel closed by the broker? In the code examples I saw a `null` message.
> ...
 
What happens if the consumer does not acknowledge a message?
> If message was not acknowledged and application fails, it will be redelivered automatically and redelivered property on envelope will be set to true (unless you consume them with no-ack = true flag).
> ...
> Beware infinitely nacked messages while redelivery count doesn't implemented in RabbitMQ and in AMQP protocol at all.

Which data formats does RabbitMQ support?
> Messages also have a payload (the data that they carry), which AMQP brokers treat as an opaque byte array. The broker will not inspect or modify the payload. It is possible for messages to contain only attributes and no payload. It is common to use serialisation formats like JSON, Thrift, Protocol Buffers and MessagePack to serialize structured data in order to publish it as the message payload. Protocol peers typically use the "content-type" and "content-encoding" fields to communicate this information, but this is by convention only.

How does `amqplib` deserialize messages?
> Plain byte array/buffer.

# The setup

## Running the setup
Start the RabbitMQ server beforehand:

```
../rabbitmq/start-rabbitmq-docker.sh
```

By running the following commands (in parallel), you can see a simple string
message being send from the producer to the consumer.

```
// Console 1
yarn producer

// Console 2
yarn consumer
```

## Output

Consumer:

```
...
Consumer = Minions like bananas! 🍌 (09:26:38 GMT+0200 (Central European Summer Time))
Consumer = Minions like bananas! 🍌 (09:26:39 GMT+0200 (Central European Summer Time))
Consumer = Minions like bananas! 🍌 (09:26:40 GMT+0200 (Central European Summer Time))
Consumer = Minions like bananas! 🍌 (09:26:41 GMT+0200 (Central European Summer Time))
Consumer = Minions like bananas! 🍌 (09:26:42 GMT+0200 (Central European Summer Time))
Consumer = Minions like bananas! 🍌 (09:26:43 GMT+0200 (Central European Summer Time))
Consumer = Minions like bananas! 🍌 (09:26:44 GMT+0200 (Central European Summer Time))
...
```