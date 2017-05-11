# Angular on the Desktop with Electron
Speaker: Troy Miles
Software Developer

Electron is a
- Cross-platform desktop app using JavaScript, HTML, and CSS.
- Created in 2013 by GitHub
- Atom runs on it

Built mainly from Node.js & Chromium.  Has a lot of power and the beauty of the web but it comes at a cost.  Minimum app size is over 100 MB.

## Creating a New Application
Create a new app using the cli as normal: `ng new ng-electron`

Install the Toolkit: `npm i -D electron-angular-toolkit`
> `-D` is equivalent to `--save-dev`
- Adds electron to an angular app
- Must run the prepare command.

There is an API demo: [https://electron.atom.io](https://electron.atom.io)

There are several commands that need to be run in preparation for using the toolkit: 

```
electron-angular-toolkit prepare // preparation to convert app to electron
electron-angular-toolkit build // build
electron-angular-toolkit publish // publish to create the executable
electron ./bundle/electron.js // runs the application locally
npm run bd && npm run pub
```

Once this becomes an electron application it can no longer be run on the web.  CLI development is now broken.

## 2 Sides of Electron
- The Renderer process which is in charge of the "web" page.
- The main process which is in charge of the "backend".

Electron gives us access to the machine.

```ts
import * as electron from 'electron';
import * as os from 'os';

@Component({
    //...
})

export class AppComponent {
    eVersion = electron.remote.process.versions.electron;
    title = `app works on ${os.platform()} with electron ${this.eVersion}!`;
}
```

Electron has many different libraries/wrappers to communicate with the operating system:
```js
const dialog = require('electron').dialog;
```

It has others such as:
- Accelerator - keyboard shortcuts
- app - application lifecycle (close and ready events)
- autoUpdater - auto updates the application
- BrowserWindow - create/control browser windows
- protocol - intercept existing protocol requests
- File object - working with the file system
- remote - main process communication
- clipboard
- nativeImage

### App LifeCycle
- ready - electron is ready
- quit - the application is quitting
- before-quit - the application starts closing its windows
- will-quit
- window-all-closed - you can control whether the app quits or not

## Adding Angular
We can program Angular just like normal.  The CLI generation still works.

## Angular Material
There are a lot of controls not yet implemented.  So for the demo code uses [Material design lite](https://getmdl.io/).  For Angular-specific components [angular-mdl](http://mseemann.io/angular2-mdl/)

## Some Other Tools
- Electron Packager `npm i electron-packager -g` - Builds binaries for Windows and MacOS.
- Wine

## Summary
It seems like Electron and Angular is a bit of a WIP.

