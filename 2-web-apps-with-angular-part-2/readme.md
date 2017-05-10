# Web Apps with Angular Part 2
Speaker: Raju Gandhi [@looselytyped](https://twitter.com/looselytyped) - CTO Integrallis Software & Technophile

These notes are in a rough state and will be cleaned up at a later date!

## Back to Part I for a Second
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

HTML for container-row component:
```html
<td>{{ container.Names[0] }}</td>
<td>{{ container.Image }}</td>
...
```

It expects to get a container object handed to it.  To accomplish this we do the following:
```html
<tr class="container-row" *ngFor="let c of containers"></tr>
```
The c in `let c of containers` represents the individual container.

In the container-row.component.ts
```typescript
export class ContainerRowComponent {
    @Input() container; // creates a set container method
    constructor() { }
}
```

and in the HTML
```html
<tr class="container-row" *ngFor="let c of containers" [container]=c></tr>
```

There is a value on my component called `container` and you need to set it to `c`.

> Don't forget the parenthesis on `@Input()` or the message will be very cryptic.

The parent owns the data and hands it off to the child.  If the child needs to tell something to the parent it must emit an event.  You can put anything in the payload of the event.
> Data flows down, events bubble up.

If I want the parent to listen for an event:
```html
<tr class="container-row" *ngFor="let c of containers" [container]=c (click)=output></tr>
```
Square brackets means I'm sending something, parenthesis means I'm going to get something back.  If you want two-way binding you can use `[()]`.

## Pipes and Filters
A pipe can be used to take something in the view and turn it into something else.  They do not manipulate the DOM.  They operate on the left-hand-side and filter the output.

Example of a built-in date pipe:
```html
<td>{{ container.Created * 1000 | date:'yyyy-MM-dd' }}</td>
```

This does not manipulate the DOM.  It only restructures the way it is displayed.

You can declare the constant in the backing component and then use it in HTML (for things like static patterns).  You could also use DI to inject it into the component.

## AJAX
There is an endpoint somewhere that I am going to hit which will send me some JSON data that will be used in our application.  

xhr has been replaced with `window.fetch`.  One structure:
* HTTP calls window.fetch
    * API.SERVICE wraps HTTP for the call. Abstract that the endpoint is `/api/`  Think DAO.
        * CONTAINER.SERVICE (use API.SERVICE)
        * NETWORK.SERVICE (use API.SERVICE)


### Creating the API.SERVICE Wrapper
Created a new folder in `app` called `shared` and inside that `api.service.ts` and `index.ts`.

```typescript
class ApiService {
    get(path) {
        return http.get('/api' + path);
    }
}
```

Why?  AngularJS was using Callbacks and Promises which are _so 2016_.  We now use _observables_ in Angular.  This abstraction hides away the BP that deals with observables.

How do we set this up?  Angular has dependency injection.
```typescript
import { Http } from "@angular/http"; // Must also be imported in Angular's modules.

export class ApiService {
    // Setting up the constructor for DI
    constructor(private http: Http)
    // private automatically creates a private instance and sets it.

    get(path): Observable<any[]> {
        return this.http.get(...)
        .map(...)
        .catch(...)
        .map(...);
    }
}

...
// Usage:
new ApiService.get('/containers')
```

### Creating the CONTAINER.SERVICE
Create new folder in `container` called `shared` and in that make `container.service.ts`.

```typescript
export class ContainerService {
    path: String = '/containers';

    constructor(private apiService: ApiService) { }

    getContainers(); Observable<any[]> {
        return this.apiService.get(this.path);
    }
}
```

### Notes on DI
If ApiService expects Http to be injected into it the class `ApiService` needs to be annotated with `@Injectable()`

This does not allow `ApiService` to be injected into `ContainerService`.  `ContainerService` must also be `@Injectable()` and inside of `app.module.ts` we must add `ApiService` as a `provider`.

`ApiService` is a singleton.  However, it can be made to not be a singleton.  In AngularJS everything was a singleton.  In Angular we can, optionally, make things non-singletons.

If a class in Angular has any annotation it is automatically `@Injectable()`.  Therefore `@Component()` extends `@Injectable()`.

You shouldn't use the constructor to manage the AJAX call.  Instead you should implement the `OnInit` method:

```typescript
export class ContainerListComponent implements OnInit {
    containers;
    constructor(private containerService: ContainerService) { }

    ngOnInit() {
        this.containerService.getContainers()
            .subscribe(containers => this.containers = containers) // .then or a CB
    }
}
```
This happens after the component is instantiated so it may not render the information if the call fails.

You can put guards in the router to prevent a component from rendering if something failed.  Preference to code the component defensively.  It depends on the use case.

## Routing
There are three parts to routing in a single-page app.  
- When I navigate to a specific URL
    - What URL?
    - What component should show up?
    - Where should it show up?

> Don't forget about the Angular Style Guide

In the `app` folder create a new file called `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard";
import { ContainersComponent } from "./containers";

export const routes: Routes = [
    {
        path: 'dashboard', // What URL
        component: DashboardComponent // What component
    },
    {
        path: 'containers', // What URL
        component: ContainersComponent // What component
        // Can add another array to do children routes.
    },
    {
        path: '**', // Default route
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
]
```

> `Routes` is a specifically declared type which is an array of itself.

All the roads lead to `app.module.ts`.  It now needs to be updated with our routes:
```typescript
import { Router } from "@angular/router";
...
imports: [
    ...
    RouterModule.forRoot(routes) // returns a new module w/ routes configured.
]
```

We still haven't defined where Angular should put the component.  Want something like this in our HTML:
```
if(currentURL = 'dashboard')
    <dashboard></dashboard>
else if ...
```

Now we add
```html
<router-outlet></router-outlet>
```
which will do the switching for us.