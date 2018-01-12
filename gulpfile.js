
'use strict';

const path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var packager = require('electron-packager');
var del = require('del');
var electronPackage = require('electron/package.json');
var pkg = require('./package.json');
var config = require('./gulp.config')();

// pull the electron version from the package.json file
var electronVersion = electronPackage.version;

// get a version of the package we need for building if one exists, otherwise use the regular version
var usableBuildVersion =  (typeof (pkg.buildVersion) !== 'undefined') ? pkg.buildVersion : pkg.version;

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function clean(path, cb) {
    log('Cleaning: ' + $.util.colors.blue(path));
    try {
        del.sync(path);
        log('delete done');
        cb();
    } catch (err) {
        log('error: ' + err);
        cb();
    }
}

/**
 *   This is a gulp script for rebuilding node_modules
 *   compatible with the current version of electron because
 *   the project now includes a native code module
 *
 *   To build the project for Client/Server web testing/operation
 *   do this command on a shell command line:
 *      npm rebuild
 *
 *   To build the project as an Electron app do this command on a shell command line:
 *      gulp erebuild
 *
 */
gulp.task('erebuild', function () {
    var eRebuild = require('electron-rebuild').rebuild;
    var arch = process.arch;

    eRebuild(
        {buildPath: __dirname,
            electronVersion: electronVersion,
            arch: arch
        })
        .then(function () {
            log('electron version: ' + electronVersion +  ' arch version: ' + arch);
            log('Electron Rebuild Successful');
            return true;
        }).catch(function (e) {
            log('Rebuilding modules against Electron didn\'t work: ' + e);
        });
});

const localTemp = path.join(__dirname, '../temp', config.electronbuild);
var opts = {
    name: pkg.name,
    platform: 'win32',
    arch: 'ia32',                           // ia32, x64 or all
    dir: config.root,                       // source location of app
    out: config.electronbuild,              // destination location for app os/native binaries
    // tmpdir: localTemp,
    ignore: config.electronignore,          // don't include these directories in the electron app build
    icon: config.icon,
    asar: {unpackDir: config.electroncompiled},  // compress project/modules into an asar blob
    overwrite: true,
    prune: true,
    electronVersion: electronVersion,    // Tell the packager what version of electron to build with
    appCopyright: pkg.copyright,         // copyright info
    appVersion: usableBuildVersion,      // The version of the application we are building
    win32metadata: {                     // Windows Only config data
        CompanyName: pkg.authors,
        ProductName: pkg.name,
        FileDescription: pkg.description,
        OriginalFilename: pkg.name + '.exe'
    }
};

gulp.task('clean:electron', function (cb) {
    return clean(config.electronbuild, cb);
});

gulp.task('build:electron', ['clean:electron'], function (cb) {
    // console.log(localTemp);
    $.util.log('Launching task to build & package binaries for',
        $.util.colors.cyan(opts.name),
        $.util.colors.magenta('v' + opts.appVersion)
    );
    opts.arch = process.arch;
    packager(opts, function (err, appPath) {
        if (!err) {
            $.util.log(' <- packagerDone()', err, appPath);
            cb();
        } else {
            cb(err);
        }
    });
});
