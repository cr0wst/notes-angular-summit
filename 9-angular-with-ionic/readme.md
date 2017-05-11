# Angular with Ionic
Michael Carducci
Magician, CTO Mago:Tech

Hybrid application provide a wrapper to the native API for web applications.

## Ionic
Gives you the tooling and UI framework to target iOS, Android, and Windows Phone.

More than a UI Framework:
- CLI
- Ionic Serve - Web Server/Debugger
- Ionic View - Makes it easy to deploy the application to different platforms. (Companion application)
- Ionic Build - Wraps Cordova for building.

### Common Confusion
- Ionic is the UI framework.
- Cordova is the bundler/compiler.
- PhoneGap is the commercial equivalent to Cordova.

### Requirements
- A Mac for iOS builds
- Node.js and NPM

### Installation
`npm install ionic cordova -g`

### Scaffolding
Recommended to use the `--v2` flag.

`ionic start applicationName blank --v2`

There are a few different types of scaffolding.  The one above provides a blank slate to work with, but there are other scaffolds that give a navbar, for example.
## Components
Ionic brings in a plethera of components.  They can be found in the slides or in the documentation.  The documentation has live demos for each component and how each one is generated.

Some are directives:
```html
<button ion-button>Agenda</button>
```

Some are selectors:
```html
<ion-header>text</ion-header>
```

## Pushing a Page on the Stack
Ionic does not use the Angular router.  Instead you push pages onto the stack and remove them from the stack when you want them to be displayed.

```ts
//...
onGoToAgenda() {
    // NavController being injected in
    this.navCtrl.push(Agenda);
}
```
Basically, the component is pushed onto the stack to give us our page.  We get the back button and transitions for free because Ionic is wrapping the native functionality.

Another example:
```ts
onGoHome() {
    // Push all the pages off the stack and really go home
    this.navCtrl.popToRoot();
}
```

In addition to your `NavController` you have your `NavParams`
```ts
onGoToAgenda(name: string) {
    this.navCtrl.push(Agenda, {userName: name});
}

// Agenda can inject NavParams to get access to these parameters.
```

## LifeCycle Hooks
Ionic provides a few different hooks.

```ts
userName: string;

//...
ionViewWillLoad() {
    this.userName = this.navParams.get('name);
}
```

## Summary
The documentation seems really solid and I don't think an hour and thirty minutes really does it justice.  Looks pretty straightforward and easy to use.