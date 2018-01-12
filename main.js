const appName = 'My Test Application';
const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

const xml2js = require('xml2js');
const xsd = require('libxml-xsd');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

var schemaXSD = path.join(__dirname, './xml/books.xsd');
var bookXML = path.join(__dirname, './xml/books.xml');

function readInFile(originalPath) {
    return new Promise(function (fulfill, reject) {
        fs.readFile(originalPath, 'utf8', function read(err, data) {
            if (err) {
                reject('File could not be read - ' + err.message);
            } else {
                console.log('read in file :' + originalPath);
                fulfill(data);
            }
        });
    });
}

function convertXMLtoJSON(data) {
    return new Promise(function (fulfill, reject) {
        xml2js.parseString(data, function XMLtoJSON(err, result) {
            if (err) {
                reject('XML could not be converted to JSON - ' + err.message);
            } else {
                console.log('read XML in: ' + data);
                console.log('parsed XML to JSON resulting in: ' + JSON.stringify(result));
                fulfill(result);
            }
        });
    });
}

function parseXSD(template) {
    return new Promise(function (fulfill, reject) {
        xsd.parseFile(template, function (err, schema) {
            if (err) {
                reject('XML did not validate correctly - ' + err.message);
            } else {
                console.log('read XSD in : ' + template);
                console.log('parsed XSD as: ' + JSON.stringify(schema));
                fulfill(schema);
            }
        });
    });
}

function createWindow () {

  parseXSD(schemaXSD).then(function (schema) {
      console.log('read the schema successfully! ');
      return readInFile(bookXML);
  }).then(function success(data) {
    return convertXMLtoJSON(data);
  }).then(function success(json) {
    console.log('converted XML to JSON data successfully! ');
  }).catch(function error(err) {
      console.log('Failed to read the XML data: ' + err);
  });

  var iconPath = path.resolve(__dirname, './favicon.ico');
  const appIcon = new Tray(iconPath);
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      icon: iconPath,
      resizable: true,
      slashes: true
    }));

  appIcon.setToolTip(appName);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
