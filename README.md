# Code For Cause Desktop Application

Code for cause crosss platform desktop application built with [Electron](http://electron.atom.io/), [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).

## Quick start

Clone the repository
```bash
git clone https://github.com/codeforcauseorg/codeforcause-desktop.git
```

Install dependencies
```bash
cd codeforcause-desktop
npm install
```

Development
```bash
npm run develop
```

## DevTools

Toggle DevTools:

* macOS: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

## Packaging

Modify [electron-builder.yml](./electron-builder.yml) to edit package info.

For a full list of options see: https://www.electron.build/configuration/configuration

Create a package for macOS, Windows or Linux using one of the following commands:

```
npm run pack:mac
npm run pack:win
npm run pack:linux
```

## Tests

```
npm run test
```

Happy Hacking!
