/***   My App
 *
 * */

module.exports = function () {
    var pkg = require('./package.json');
    var root   = './';
    var client = './ClientSide/';
    var clientapp = client + 'app/';
    var images = clientapp + 'images/';
    var electronbuild  = './edist/';    // place the binary electron build here
    var webbuild = './dist/';            // place web build here
    var electronExeFolder = electronbuild + '/MyProject-win32-';
    var ci     = './ci/';               // place CI reporting here

    var config = {

        electronbuild: electronbuild,
        webbuild: webbuild,
        electronExeFolder: electronExeFolder,
        electroncompiled: 'node_modules/{libxml-xsd,libxmljs-mt,nslog}/**/*',
        // Need proper regex patterns for main directories, sub-directories and top level files to ignore
        // cannot be strings, but be raw regex patterns (unquoted)
        electronignore: [
            /\/\.idea$/,
            /\/\b(ci|ClientSide|WiXInstaller|loaders|edist|ExternalStyles)$/, // extra directories to ignore
            /\/\b(ServerSide\/test)$/, // server side unit test directory
            /(\.htmlhintrc|\.jscsrrc|\.jshintrc|.stylelintrc|tslint\.json)$/, // lint files
            /(gulp\.config\.js|gulpfile\.js)$/, // gulp files
            /(karma\.conf\.js|karmaBase\.conf\.js|karmaDebug\.conf\.js)$/, // karma config files
            /(webpack\.config\.js|webpack\.testConfig\.js|webpack\.UnittestConfig\.js|webpackBase\.config\.js)$/, // webpack config files
            /(tsconfig\.json)$/, // ts config file
            /(\.gitignore|README\.md)$/ // ignore, readme and package files
        ],
        icon: images + 'icons/translator.ico',
        packages: [
            './package.json'
        ],
        root: root,
        ts: [
            clientapp + '**/*.ts'
        ],
        css: [
            clientapp + '**/*.css'
        ]
    };

    return config;
};
