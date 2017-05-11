# Communication with the Server
Speaker: Yakov Fain [@yfain](https://twitter.com/yfain)
Author of "Angular 2 Development with TypeScript"

A lot of this is based off a set of slides that was presented during the session.  These notes are best used with a supplement of those slides.

## The Server
For the sake of this talk we will be using Express.js for the server.  However, this could be any language.

> A note about TypeScript with express.js
> `import * as http from 'http';` becomes `var http = require('http');`

Installing the TypeScript definitions: `npm i @types/express --save`

## Angular Client
All APIs are declared in the `http.d.ts`.  All of these methods return an `Observable<>` which means that you can subscribe to them.

### Angular HTTP Support
You need to declare the `HttpModule` in `@NgModule` and inject an `Http` object into the constructor of a component or a service.

Notice that the module is `HttpModule` but the service is `Http`.  This is not typical and is only done for simplicity.  Normally you would inject it into a service and inject that service into the component.

The service will then get accessed via the `ngOnInit()` which is called after the object is constructed.

```ts
constructor(private http: Http) {
    // Declares the intentions
    this.dataSource = this.http.get('/api/products').map(res => res.json());
}

ngOnInit() {
    // Performs the actual call.
    this.dataSource.subscribe(
        // ...
    )
}
```

> Use DI to inject the service into the component and DI to inject Http into the service.  The method in the service will return an `Observable` that will subscribe immediately.  At least that's what the later example did.  I'm assuming it did it that way to remain semi-stateless.  An `Observable` is not stateless and needs to be created on each request.

> You can have providers in the component instead of the `app.modules.ts` 


### Dev Mode: Two Servers
In dev mode you can continue running the dev server for the client on port 4200 with `ng serve`.  However, our REST server runs on port 8000.  Due to same-origin policy we can configure a proxy on the client or add the header `Access-Control-Allow-Origin:*` on the server.

#### Configure a Proxy on Client
```json
//proxy.json
{
    "/api": {
        "target": "http://localhost:8000",
        "secure": false
    }
}
```

Then need to start via script with:
```json
"scripts": {
    "start": "ng serve --proxy-config proxy-conf.json",
    //...
}
```

Then run the client with `npm start`

## Building Apps for Production Deployment
### JiT vs AoT compilation
- Just-In-Time compilation: your app includes Angular's compiler and is dynamically compiled in the browser.
- Head-of-Time compilation: Angular components and templates are pre-compiled into JS with the `ngc` compiler.
- The AoT-compiled apps don't include the Angular compiler.

> AoT doesn't always result in smaller bundles, but they load faster in the browser.

`ng build -prod` by default will perform AoT.  However, `ng build` does not by default.

You can also do `ng build -prod -aot=false` if you want to disable AoT.  Only recommended to turn it off if you are running into issues.  AoT is relatively new and some 3rd party libraries might have problems.

## WebSockets
Allows you to subscribe to events on the server.  You can push, for example, notifications, from the server to the client.

HTTP is *half-duplex* where data only moves in one direction.  WebSocket is *full-duplex* which goes in two directions.

Request is made via the `ws://` protocol.  If the server supports WebSockets it will return a `101` (switching protocols.)  You can see this in the network tab in Chrome dev tools.

Can use the package `ws` with npm to start a WebSocket server.  Can run on the same port as the `http` server.