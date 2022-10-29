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

- What is a channel specifically? How is it different from a queue?
- How is a channel closed by the broker? In the code examples I saw a `null` message.
- What happens if the consumer does not acknowledge a message?
- Which data formats does RabbitMQ support?
- How does `amqplib` deserialize messages?

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