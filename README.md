# my-electron-app

**Clone and run for a quick way to see this bug https://github.com/electron-userland/electron-packager/issues/733 in action.**

The sole purpose of this app is to demonstrate an Electron Packager Issue (#733). It is based on the "electron-quick-start" app. The documentation below is info from that project. See the `package.json` file for the additional packages that have been added to the basic app to expose the functionality needed to reproduce this issue. Appropriate code changes have been made in the following files to expose this bug:

- `gulp.config.js`
- `gulpfile.js`
- `main.js`

Additional support files added to work with these code changes are :
- `xml/books.xml`
- `xml/books.xsd`

This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](http://electron.atom.io/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Recompile native modules with Electron bindings
gulp erebuild
# Run the app
npm start

# Build the native platform app
gulp build:electron
# THE ABOVE STEP FAILS
```

The last step listed above `gulp build:electron` fails in Node 8.9.4 due to a bug in `electron-packager` or its dependencies. This sequence works in Node 7.10.1.

Once the above is fixed, you should be able to run the following to execute the built application. (in a windows environment)

```
# Run the built app
cd edist/my-electron-app-win32-x64/
my-electron-app.exe
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electron.atom.io/docs](http://electron.atom.io/docs) - all of Electron's documentation
- [electron.atom.io/community/#boilerplates](http://electron.atom.io/community/#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
