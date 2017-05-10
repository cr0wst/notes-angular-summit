# Angular 4 for Java Developers
Speaker: Yakov Fain [@yfain](https://twitter.com/yfain)
Author of "Angular 2 Development with TypeScript"

A lot of this is based off a set of slides that was presented during the session.  These notes are best used with a supplement of those slides.

## Angular Framework
Angular is not MVC.  It is a component-based framework that allows for dependency injection, routing, and the use of TypeScript.

An application is a tree of components.  Uses custom tags to inject components into HTML.

## TypeScript for Java Developers
Instead of `@Annotations` think `@Directives()`.

See [3-mastering-typescript](3-mastering-typescript) for more details on TypeScript.

## angular-cli
Tool created to solve a lot of the _beginner problems_ in creating a new project and components.  Has the ability to scaffold the project and create different components, services, modules, etc.

Can serve the app to the browser using `ng serve`.  Has the ability to bundle apps for dev and production deployments.  Generates boilerplate unit tests and configures test runners.

Uses **Webpack** behind the scenes.

### Creating a new project
```
ng new project-name
```

It will generate a new project and install the dependencies defined in the `package.json`.

### Running the Application
```
cd project-name
ng serve -o
```
In development mode it will build the bundle in memory.

### Preparing for Production
Development mode is pretty large.  Generally we would run it through a production build to reduce the size and prepare it for production.
```
ng build -prod
```
This will build it not in memory, but will put the output into the `dist` directory by default.  A production build will do some optimization (minification).  The size is much smaller.

What do you do with it?  You put it where you would traditionally serve static content.

## Single Page Apps
The application does not do a full reload on content change.  The router handles the rendering in the different viewports.

### Router Features
- Pass data to routes.
- Child component can have their own routes.
- Guarding of routes.
- Lazy loading of modules.

### Dependency Injection
Constructor provided dependency injection.  By default instantiated as singleton (sort of).  Option to instantiate as non-singleton (Spring: Prototype w/ proxy).  Can use factories for DI.

If providers are defined in the `modules` file Angular will treat it as a singleton by default.  If the provider is defined in the component, it will not necessarily be treated as such.

### Reactive Programming
Push instead of pull.  Angular, unlike AngularJS, has one-way data binding.  We subscribe to messages from Observable and handle them by Observer.

#### Reactive Programming in Angular
- Router
- Reactive Forms
- EventEmitter
- Handing HTTP responses
- WebSockets

### Inter-component Communication
This is done in a loosely coupled fashion.  Done via `@Input()` properties and `@Output()` with `emit()`.  Recommended to use an injectable service as a mediator.  Components that are not related can share data via this mediator.  A component can `emit()` into the service and then the service is injected into other components that might need the information.

### Forms API
- Template Driven Forms
    - Form declared inside the HTML.  You will have some directives.
- Reactive Form

### Automating deployments with npm scripts
`npm run build` can be used to have npm run the builds defined in the `package.json`.  Can add `ng build` to the `scripts` as an alias of `build`.  Can chain them together.  npm knows that it has to run `postbuild` after `build` and `predeploy` before `deploy`.

## Angular + Spring Boot
See the demo and slides.

### JHipster
Provides a tool to generate an Angular + Spring Boot application. See: [JHipster](https://jhipster.github.io)

### Material Design
Palettes and styles provided by Google.  Third party library Angular Material 2 has some built-in components for Angular using Material Design.  More components through PrimeNG.