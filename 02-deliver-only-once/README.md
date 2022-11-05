# 02 Deliver only once

The goal was to get familiar with RabbitMQ.

- See, how to deliver messages "only once":
  - 1 producer
  - 2 consumers
  - A message is always only consumed by one consumer at a time.

# What did I learn?

- RabbitMQ by default delivers messages "only once".
- It did not require any code changes to deliver messages "only once".

# Questions that came up

Is it possible to send a message to all consumers of a queue?
> I first only found answers how to deliver a message to multiple queues.
> A common pattern is a "fanout exchange" or using a routing tag.
> 
> It seems, that it is not possible to send a single messages to all consumers
> of the same queue.

But I have an idea:
- create a new queue for every consumer with a suffix
- use an exchange **or** routing tag to send a message to multiple queus

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

// Console 3
yarn consumer
```

## Output

Consumer 1:

```
...
Consumer = I will be delivered only once! 🍌 (08:33:42 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:33:44 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:30 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:34 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:38 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:42 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:46 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:50 GMT+0100 (Central European Standard Time))
...
```

Consumer 2:

```
...
Consumer = I will be delivered only once! 🍌 (08:34:40 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:44 GMT+0100 (Central European Standard Time))
Consumer = I will be delivered only once! 🍌 (08:34:48 GMT+0100 (Central European Standard Time))

...
```