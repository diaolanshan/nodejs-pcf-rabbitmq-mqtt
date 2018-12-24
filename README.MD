A nodejs application which target to demo how to use mqtt protocol to connect to an rabbitmq which hosted in the cloudfoundry platform.

The application depends on the following library:
```json
"dependencies": {
        "restify": "7.2.2",
        "mqtt": "^2.13.0",
        "bluebird": "^3.5.0",
        "cfenv": "1.1.0"
    }
```

The application contains two urls:

- {base_url}/mqtt/rabbitmq/message/pub will publish a message to the rabbitmq broker, the topic name is __hello/world__
- {base_url}/mqtt/rabbitmq/message/pub will subscribe to the topic __hello/world__

The full code can be found in [github](https://github.com/diaolanshan/nodejs-pcf-rabbitmq-mqtt).