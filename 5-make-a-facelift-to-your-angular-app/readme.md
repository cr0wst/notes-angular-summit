# Make a Facelift to your Angular App with UI Libraries
Speaker: Yakov Fain [@yfain](https://twitter.com/yfain)
Author of "Angular 2 Development with TypeScript"

Repo with Example Code [Farata/angular2typescript](https://github.com/Farata/angular2typescript)

A lot of this is based off a set of slides that was presented during the session.  These notes are best used with a supplement of those slides.

## Material Design
A visual language specification that defines the principles of good design: [Material Design](https://material.io)
- Color Picker [https://getmdl.io/customize/](https://getmdl.io/customize/)

### Angular Material 2
Takes the specifications and applies them to different components.

- Github: [angular/material2](https://github.com/angular/material2)
- [Documentation](https://material.angular.io)

In general it is a good idea to stick to Angular Material 2.  However, if there is a need for other components there is also [PrimeNG](https://www.primefaces.org/primeng).

#### Adding Angular Material 2 to a CLI project
1. Create a new CLI Project
```
ng new myMaterialProject
```

2. Install Angular Material 2:
```
npm i @angular/material --save
npm i @angular/animations --save
```

3. Include one of the pre-built themse to the styles.css
```css
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
```

#### Adding material modules to your application
Only need to add specific components that you need.

Create a feature module that includes `BrowserAnimationsModule` and selected material modules used in your application.  Import this feature module into your app root module.

See sample feature module `auction-material.module.ts`.

## Themes
A theme is a set of colors applied to your application.  It consists of palettes:
- primary
- accent
- warn
- foreground
- background

Pre-built themes are in this directory: `node_modules/@angular/material/prebuilt-themes` but you can also create custom themes.

### Adding Pre-Built Themes
Either in HTML by using
```html
<link href="..." rel="stylesheet">
```

or in styles.css
```css
@import '...'
```

### Using Angular material components
Example
```html
<md-toolbar color="primary">
    <a [routerLink]="['/']">Online Auctions</a>
    <button md-icon-button>
        <md-icon>more_vert</md-icon> <!-- Name of one of the icons -->
    </button>
</md-toolbar>
```

> Side note during demo: should look into using `yarn` instead of `npm`.  It is apparently faster and it caches packages locally to speed up installation.

#### Material Icons
To use Material Icons you need to bring in the following stylesheet.
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

> Angular Material does not offer a grid layout.  Could use the one built-in to Foundation or Bootstrap.  Could also use Flex Layout or PrimNG (which offers a grid)

## PrimeNG
Angular Material doesn't have all of the components you might need.  Can supplement some of the components using PrimeNG.

This is an open source UI library with 70+ components.  It is not a framework, it is components ala cart.

> PrimeNG has an editor on their website you can use to play around with the various options.

PrimeNG has its own theming.  If you switch from using `css` to something like `scss` you can overlap some of the theming between the two libraries.

### Adding PrimeNG
Installing with NPM:
```
npm i @angular/animations
npm i font-awesome --save
npm i primeng --save
```
Adding styles to the `.angular-cli.json`
```css
"styles": [
    ... 
]
```

Some PrimeNG components are directives and some are components.  Some components have dependencies that need to be specified as a `provider` in the modules file.