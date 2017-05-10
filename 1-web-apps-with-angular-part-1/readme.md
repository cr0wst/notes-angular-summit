# Web Apps with Angular Part 1
Speaker: Raju Gandhi [@looselytyped](https://twitter.com/looselytyped) - CTO Integrallis Software & Technophile

These notes are in a rough state and will be cleaned up at a later date!

## What to expect:
- Attempting to differentiate between AngularJS (1) and Angular as it stands today. (Angular 2/4)
- How to bootstrap a project
- What tooling is available
- Writing a simple application from the ground-up.
    - Routing
    - Ajax
- What is a coponent?
    - Building a component hiearchy.
- Models
- Pipes
- Ajax with HTTP
- Routing using the built-in Angular router.

> Angular has been designed from the ground-up for Enterprise level development.  Angular is opinionated and the batteries are included.

## AngularJS vs Angular
What changed?  **Everything** changed.  Everything from the language up has changed from AngularJS to Angular.
* TypeScript
* Components instead of MVC/MVVM.

The biggest change is that AngularJS was a framework.  Like Spring, or Hibernate.  You put pieces in place and the framework is the structure from which you hang your code and let it do its magic.

Angular, is not technically a framework.  It is now a **platform**.  Angular is to JavaScript what the JVM is to Java.  You can now use it to build a framework.  However, you now have to tell it that what you're writing is for the browser and make it happen.  A platform makes no assumptions about what you're targeting.

Some paradigms came along:
* Dependency Injection
* Services (No more factories)

## Bootstrapping a New Project
The easiest way is to use [plunker](http://plnkr.co).  A second option is the [angular-seed](https://github.com/angular/angular2-seed) project. _Recommended to not use this._  It hasn't been updated in awhile.  It is _maintained_ by the Angular team.
The third option is to use the [angular-cli](https://github.com/angular/angular-cli).  This is now the recommended, de-facto, way to bootstrap a new project.

Angular-CLI handles everything from creating a new project to creating components, directives, pipes, services, classes, etc.
> Angular-CLI is the distillation of processes that come together and make a web app happen.
The CLI doesn't cover all of the facets of Angular, but it helps for web apps.

## Editors
Recommendations:
* IntelliJ Webstorm (or IDEA)
* Visual Studio Code (top recommendation)
* Sublime
* Atom

## What are we going to do today?
We are going to port an AngularJS application to Angular.  Not the whole application, but a few components of it.

[Demo Code](https://gitlab.com/looselytyped/nfjs-angular-demo) d3ae6d44 is the initial commit.

### The Files
Project was created using angular-cli.  This gives us some of the following files:
* package.json for npm dependencies.
    * Tends to have dependencies specifically for building web applications.
    * Sibling dependencies expecting you to have rxjs, typescript, and zone.js. **On your path.**

### Angular Differences
Angular 2 got rid of 2 way binding.  The view could change the state which gave a backwords dependency to the state.  Now, the state drives the view.  If you want to change the state from the view you have to explicitely bind it backwords.

### Components
You have the template and the logic together in a 'package.'  It is a notion of reusability.

#### Typical Page
You have the root component or 'app component' which acts as the root node.  You hang the other components off of this.  You might have other components like:
* Sidebar component
* Main div component
* Header component
* Each row of a table might be a component in itself.

Components are state backed by a template.

#### Do I need a component?
Reusability and how much state am I managing?  These two things will help you decide if you should make it into a component.  If there is enough state, make it a component.

#### More Details on Components.
Fully defined component:
```typescript
//app.component.ts
import { Component } from "@angular/core";
// This is what makes it an angular component: (decorator)
@Component({
    // The tag that will be used in the DOM
    selector: 'app-root',
    // This is the HTML fragment that the class will back.
    // Note: templateURL is preferred.

    // templateUrl: './app.component.html'
    template: `
        <h2>{{title}}!!</h2>
    `
})

// This is the state portion:
// Export is what makes it public(?)
export class AppComponent {
    title = "Hello Angular Summit"
}
```

Some notes:
* This is single-way binding from view to component.  If I change the view, the state does not change.

Need to declare the component for Angular to use it:
```typescript
//app.module.ts
//...
import { AppComponent } from "/app.component";

@NgModule({
    // I just made something, notice it
    declarations: [
        AppComponent
    ],
    // Domain Modules
    imports: [

    ],
    providers: [

    ],
    // When you bootstrap yourself, start here:
    bootstrap: [
        AppComponent
    ]
    // Big applications might have a chance of conditionally
    // bootstrapping more than 1 component.
})
//...
```

We now have to put the component somewhere in the DOM:
```html
<!-- index.html -->
<html>
<head>
</head>
<body>
    <app-root></app-root> <!-- this is the selector -->
</body>
</html>
```

Always three parts:
- Define component with template.
- Declare it in the module system.
- Use the selector to place the component.

> Recommended plugin Augury - Shows component hierarchy as it stands.

In our application we are viewing the sidebar as a static piece.  It is just thrown into the application.  You might want to make it a component, but we are going to keep things simple.

### Creating More Components
Recommended to use the [Angular Style Guide](https://angular.io/styleguide)

#### Structure
- Project Root (src/app)
    - containers
        - containers.component.ts (state)
        - containers.component.html
        > There is a plugin for VS Code for Angular snippets `angular v4 typescript snippets`

Creating the component follows the same steps as above.

> Side note on starting fresh:
>```
> ng new blah
> npm install
> ng serve
>```
> `ng serve` dynamically creates a build file and starts the instance.  For production use you should be using webpack.  You can use `ng eject`to separate the application from angular-cli.
>
> Going to production is serious business and should not be taken lightly.

The complexity is not in the component hierarchy, the complexity is in the component itself.

#### A caveat on index.ts
Inside the component directory you can have a file like such:
```typescript
// index.ts
export { ContainerComponent } from './containers.component';
export * from './container-list'; // requires index.ts in containers-list folder
```

Then you can import in the module as such:
```typescript
import { ContainerComponent } from './containers/';
```

Now in my directory structure I don't need to specify each component's path.  I can do something like:
```typescript
import { 
    ContainerComponent, 
    ContainerComponentList
    } from './containers/';
```
Bottom line, index.ts lets you export everything in a directory for use elsewhere so you don't need full paths.
Unfortunately the angular-cli does not support the index.ts functionality _yet_.

#### Listing the containers (Iteration)

This will not work:
```html
    <tbody>
        <container-row></container-row> <!-- custom component for the row -->  
    </tbody>  
```

The browser _expects_ nothing other than a `<tr>` inside of a `<tbody>`.

Can't use a custom tag, can't use `<tr>` because now you can't use `<tr>` anywhere else.

The solution, use an attribute:
```typescript
selector: 'tr.container-row'
```

```html
<tr class="container-row">
```

However, we need to loop:
```html
<tr class="container-row" *ngFor="let c of containers">
```
This doesn't have data binding, yet.

In Part II we will cover Ajax, Pipes, and Routing.