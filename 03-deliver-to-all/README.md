# 03 Deliver to all

I wanted to deliver a message to all consumers of a queue.

**This is not possible in RabbitMQ.**

**BUT**, there is a way to produces the same **effect**:
_Delivering a message to all instances of the same service._

# What did I learn?

To send a message to all instances of a server
- create a producer with a direct exchange
- create a consumer service
  - each instance asserts a new queue
    - queue name can be random -> better: shared prefix + unique suffic (hostname + process id?)
  - each instance binds its queue to the exchange of the producer
- producer and consumers use the same routing key - here its just `"all"`

**_This pattern can also be used to send messages to different queues._**

Or you could use a fanout exchange.

# Questions that came up

None.

# The setup

## Running the setup
Start the RabbitMQ server beforehand:

```
../rabbitmq/start-rabbitmq-docker.sh
```

Producer + consumers:

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
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:28 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:30 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:32 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:34 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:36 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:38 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:40 GMT+0100 (Central European Standard Time))
consumer-24140 = I will be delivered to all consumer instances! 🍌 (09:13:42 GMT+0100 (Central European Standard Time))

...
```

Consumer 2:

```
...
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:28 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:30 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:32 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:34 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:36 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:38 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:40 GMT+0100 (Central European Standard Time))
consumer-24151 = I will be delivered to all consumer instances! 🍌 (09:13:42 GMT+0100 (Central European Standard Time))


...
```