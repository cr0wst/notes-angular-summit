# Angular Style Guide
Speaker: Ben Ellingson
Lead Developer NoFluffJustStuff.com

Some things to consider:
- What differences do you see between the AngularJS recommendations and the Angular recommendations.
- What's new in the Angular world?

Can find the Angular 2 Style Guide on the Angular Website

Hugely recommended to use the `angular-cli` as it is opinionated and compliant with the Angular Style Guide.  Some little annoyances from the cli that conflicts with `ng lint`.

> The Angular Style guide is a living document.  Many of the principles are relevant to AngularJS and Angular and application development in general.

## Why do we need a style guide?
How we communicate with each other and the things that we talk about there is a lot of confusion because things are done so many different ways.  The style guide drives us to producing a more consistent product.

> "Style without substance is awful." - Chris Anderson (TED)

## The Angular 1 Style Guide
Seeing the benefit by example:

### The Benefit
There are 5 ways to create a controller:
```js
// 1 : easiest to understand
function Controller1($scope) {
    $scope.message = 'Hello 1';
}
```
```js
// 2 : this looks pretty confusing to the beginner
angular.module('myApp'.controller('Controller2', ['$scope', 
function($scope) {
    $scope.message = 'Hello 2';
}
]))
```
```js
// 3 : this is a little better
angular.module('myApp').controller('Controller3', Controller3);

Controller3.$inject = [ '$scope' ];
// Hoisting can be confusing.  Variables and declarations are brought to the top of the code.
function Controller3($scope) {
    $scope.message = 'Hello 3';
}
```
```js
// 4 : Another way
// Remember, order matters w/ function assignment
var Controller4 = function($scope) {
    $scope.message = 'Hello 4';
}

Controller4['$inject'] = ['$scope'];

angular.module('myApp').controller('Controller4', Controller4);
```
```js
// 5 : style guide recommends the 'controller as' style
angular.module('myApp').controller('Controller5', Controller5);

function Controller5() {
    // Instead of binding your functions and properties to scope, you bind it to VM and expose
    // it to your template.
    var vm = this;
    vm.message = 'Hello 5'
}
```

None of the books really show option 5.  However, the style guide does.  Thus the evolutionary benefit.

### Single Responsibility
Define 1 component per file, preferably less than 400 lines of code.  Easier to read and test.

### Small Functions
Define small functions no more than 75 lines of code.
> Recommended Reading: Clean Code - A Handbook of Agile Software Craftsmanship
- Easier to read.
- Easier to test.
- Easier to understand.

### IIFE - Immediately Invoked Function Expression
```js
// Pre-semi colon helps insure that the previous thing brought in was ended properly.
;(function () {
    'use strict';

    angular.module('myApp').controller('PersonController', PersonController);
    function PersonController() {

    }
})();
```
### 'Controller As' Syntax
Promoted by the Angular team, used in official example code.  This is closer to plain old JavaScript.  There is no scope.  It is more inline with class style code.  Also helps avoiding `$parent` scope references.

```js
angular.module('myApp').controller('PErsonController', PersonController);

function PErsonController() {
    var vm = this;
    vm.person = { id: 1, fistName: 'Jim', lastName: 'Smith', age: 35 };
}
```

```html
<div ng-controller="PersonController as ctrl">
    <h2>Hello {{ctrl.person.firstName}}</h2>
</div>
```

### Bindable Members Up Top
```js
function PersonController() {
    var vm = this;
    vm.updatePerson = updatePerson;
    vm.deletePerson = deletePerson;

    function updatePerson() { }
    function deletePerson() { }
}
```

### Use Function Declarations
Should prefer declaring functions over assigning functions.

### `activate` Function
```js
function PersonController(personService) {
    var vm = this;

    activate();

    function activate() {
        //...
    }
}
```
### Manually Identify Dependencies with `$inject`
```js
// Not Recommended
angular.module('myApp').controller('PersonController', ['personService', function(personService { })])

// Recommended
PersonController.$inject = [ 'personService' ]
// ...
```

Can also use `ng-annotate` for `gulp` or `grunt` o accomplish this.

### Defer Logic to Services
Controller should be a thin layer that orchestrates the interaction between your view and application.
- Keeps your controllers simple.
- Easier to reuse the code.
- Easier to test.
- Remove dependencies and implementation details from the controller.

#### Services
Follow the single responsibility principle. Also follow the standards laid out for controllers.

## Angular Style Guide (Angular 2+)
These are the style recommendations for Angular 2+ (or just Angular).

Each guideline describes either a good or bad practice, and all have a consistent presentation.

- **Do** is the one that should *always* be followed. 
- **Consider** guidelines should generally be followed.
- **Avoid** indicates something that should *never* be done.

### Use Consistent Naming
Encourages readability and maintainability:
- Use CamelCase naming in components.
- Name files by feature and type.
- Separate file name parts with *dots and dashes*.

### Bootstrapping
You should have a `main.ts` file as the entry point to your application.  Avoid putting app logic in this file.

### Component Naming
Use camel case and add a type suffix to the component names:
- AppComponent - app.component.ts
- PersonComponent - person.component.ts
- PersonListComponent - person-list.component.ts
- PersonService - person.service.ts
- Logger - logger.ts

### File Names
Use consistent file naming format.  Separate file names with dots and dashes.
- person-list.component.ts
- person-list.component.html
- person-list.component.css

File names should use *feature.type.ts*  Makes your application easier to read and understand.

### Test File Names
Add 'spec' suffix to the component's file name
- person-list.component.ts
- person-list.component.spec.ts
- person.component.ts
- person.component.spec.ts

Test files are in the same directory as the files they are testing.  This also provides good pattern mathcing for test runners.

### General Coding Conventions
Just like Java:
- Upper camel case class names
- Lower camel case names for methods and properties

### Constants
It used to be recommended to use UPPER_CASE constants.  However, now it is recommended to use lower case constants.

### Imports
- Leaving spaces between each item being imported.  
- Leave an empty line between third party imports.
- Alphabetize by module. (eh... maybe)
- List imported assets alphabetically (again.. eh..)

### Application Structure
The LIFT principle:
- Locating your code is easy.
- Identify code at a glance.
- Flat structure as long as possible.
- Try to stay DRY.
    - Do Not Repeat yourself.

When you get up to 7+ files you should consider separation.  Don't go nuts and sacrifice readability though.

> You can use the `--flat` flag with the `angular-cli` to keep the flat structure and prevent it from creating a new folder. `ng g component folder-name component-name --flat`.

I kind of like this approach.  I think it prevents directory tree bloat, especially when you have sub-components.  You could put them in a parent component's folder to help collect them together.

### Small App File Organization
- index.html
- app/
    - main.ts
    - app.component.ts
    - person-list.component.ts
    - person.component.ts
    - person-list.component.html

### Organize Files by Feature
Instead of a service folder or directives folder, group components by feature.

The shared folder is no longer recommended.

### Core Feature Module
Create a module named CoreModule in `app/core/core.module.ts`
- Eagerly loaded
- Singleton services used throughout the application
    - Logger
    - Exception
- Application-wide Single Use Components
    - NavComponent
    - SpinnerComponent

### Barrels
The `index.ts` file which aggregates many imports into a single file.  This is **no longer recommended**.  You can still do it, but it's more of a personal preference.  It's not as necessary anymore with how applications are built and composed.

Most people are just making use of their tooling for imports.

### Components
- Use kebab-case naming for component selectors
- Use TML element selectors for components

```ts
@Component({
    selector: 'employee-list'
})

export class EmployeeListComponent { }
```

```html
<employee-list></employee-list>
```

#### Templates
Extract templates and styles to their own files
```ts
@Component({
    selector: 'employee-list',
    templateUrl: 'employee-list.component.html',
    styleUrls: ['employee-list.component.css']
})
```

Sometimes it's ok to have inline templates, but it's really discouraged.

#### Input and Output
Use `@Input()` and `@Output()` instead of input and output properties of the component.
```ts
export class EmployeeListComponent {
    @Output() change = new EventEmitter<any>();
    @Input() label : string;
}
```

### Member Sequence
Place properties at the top followed by methods and place private members after public members.  They recommend alphabetized.

There is something to be said about grouping public and private methods based on functionality.

### Put Logic in Services
- Services are singletons.
- Ideal for business logic.
- Ideal for sharing methods across a feature or a whole app.
- Ideal for sharing stateful in-memory data.
- Follow the single responsibility principal
- Provide services in the top-most component where they will be shared.
- Use the same conventions as in components.
```ts
@Injectable()
export class EmployeeService {
    constructor(private http: Http) { }
}

// employee-list.component.ts
export class EmployeeListComponent {
    constructor(private employeeService: EmployeeService) { }
}
```


You also need to declare it as a `providers` in the `app.modules.ts` file.

### Data Services
Place logic for data operations in to data services and make them responsible for XHR requests.  This can make your components and services more testable.

### Lifecycle Hooks
Use lifecycle hooks to tap into events exposed by Angular
```ts
export class EmployeeListComponent implements OnInit {
    //...
    ngOnInit() {
        // gets called after the object is constructed
    }
}
```

### Routing
Separate your routing into a routing module.  Focus only on routing in this module
```ts
const routes: Routes = [ 
    //...
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)]
})
```

You also need to import the routing into your `app.module.ts`.

### File Templates and Snippets
Take advantage of your IDE's templating and snippets feature.
- Work faster
- Consistent Code Structure