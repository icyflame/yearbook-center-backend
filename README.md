# Yearbook Center Backend API

JSON API that the web client, and any clients in the future will consume.

Find the documentation for this API [here](./api-doc.md)

This API is built using [RestifyJS](http://restifyjs.com),
and uses [FrisbyJS](http://frisbyjs.com) as the testing framework.

#### Starting the API server

```shell
npm i -g foreman
touch .env
# add configuration (as KEY=VALUE) in .env
nf start
```

**This will start the server on `ENV['PORT']`, and will drop to
5000 as the default.**

Licensed under [MIT](./license).

Copyright (c) 2015 [Siddharth Kannan](http://icyflame.github.io) All Rights Reserved.
