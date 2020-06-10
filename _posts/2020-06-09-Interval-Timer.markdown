---
title: "Interval Timer :clock10:"
layout: post
date: 2020-06-09 01:28
tag: 
- Electron
- Web Dev
image: /assets/images/projects/interval_timer/thumbnail.png
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Timer for Interval Reminders"
category: project
author: danielchoi
externalLink: false
---

## Summary

Personal Project to build an app while also learning how to develop using the Electron framework. The purpose of buildling the app was to build an app that reminds the user of time spent. Frequently, we spend time on our computer, looking into the screen for a long time without realizing how much time we spent. This can greatly tire our eyes, and I wanted a way to take breaks in the middle. 


## Features

While building the application, I also wanted to try out as many different features of electron I could that would fit the apps functionality. The below are the features in electron I've made use of in impelmenting the application

### Creating a Background Application

When building applications, its pretty common to create applications that users work on directly. In which case, we just create a window like this

```javascript
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
```

For this application, however, I wanted it to be a background app that runs on the tray, which required the tray object, and modify the window slightly. For the window, to give the idea that its a background app, I basically set `show: false` so that the window initially doesn't show, and run the `app.dock.hide()` so that in MacOS it doesn't show in the dock. 

```javascript
  const window = new BrowserWindow({
    width: 250,
    height: 60,
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
  })

  window.setIcon(path.join(__dirname, '/assets/icon.png'));
  window.loadFile(path.join(__dirname, 'index.html'));

  app.dock.hide();
```

Additional parts include setting the window property `setAlwaysOnTop` and `setVisibleOnAllWorkspaces` as true so that I am able to have the timer show over other applications that are fullscreened. Also, the window shouldn't be fullscreenable or resizable (as set above)

```javascript
  window.setAlwaysOnTop(true, "floating");
  window.setVisibleOnAllWorkspaces(true);
  window.setFullScreenable(false);
```

This allows for the app to pop up on top of other applications


<img src="/assets/images/projects/interval_timer/1.png" width="50%" style="display: block; margin-left: auto; margin-right: auto;">
<figcaption class="caption">App showing above a fullscreen VS Code</figcaption>


---

### Creating a Tray App
Now, getting into the Tray app, one important factor was that I needed a way to close the app since the app doesn't show on the dock. In order to do this, a tray icon and a tray menu is needed to show the quit option. 

First, to create a tray icon, the following code is used. Since the window isn't shown when created, it is either shown or hidden whenever the tray icon is clicked.

```javascript
  let icon = nativeImage.createFromPath(path.join(__dirname, '/assets/tray-icon.png'))
  tray = new Tray(icon)

  tray.on('click', function(event) {
    if (window.isVisible()) {
        window.hide()
    } else {
        showWindow()
    }
  })
```

The `showWindow()` code was used from [ryanbaer's tutorial](https://steemit.com/education/@ryanbaer/getting-started-with-electron-a-basic-menubar-app-part-1). The code basically opens up the window in the position based on the tray's position.

The final part is creating a tray app was to setup the right click menu. For now, I want three options available in the applicaiton: The About window, settings window, and quit function. The right-click menu is created by using the code below.

```javascript
const contextMenu = [
    {
       label: 'About',
       click: function () {
          console.log("Clicked on Help")
       }
    },
    {
      label: 'Settings',
      click: function(){
       createSettings()
      }
   },
   {
     label: 'Quit',
     click: function(){
       app.quit()
     }
   }
 ]
 
  tray.on('right-click', function(event) {
    tray.popUpContextMenu(Menu.buildFromTemplate(contextMenu))
  });
```

The `createSettings` is basically a function that creates a new window, and can be seen in the [github repo](https://github.com/jerichoi224/interval-timer)

<img src="/assets/images/projects/interval_timer/2.png" width="50%" style="display: block; margin-left: auto; margin-right: auto;">
<figcaption class="caption">Tray setting showing up</figcaption>
### Electron Remote 

Another significant part of the app was using electron.remote. Since I have multiple processes occuring (main window and the settings window), I need to share the data between the two processes. In doing this, I use the Electron Remove Module. The electron Module Provides basically provides a global variable/dictionary that can be accessed accross processes.

I create the timer variable, that I need to modify over processes along with the store.js which provides saving data through local file. The storing function using local files was implemented using [Cameron's tutorial](https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e).
```javascript
global.timer = {
  start_time: Math.round(new Date() / 1000),
  started: false,
  workTime: store.get("workTime"),
  breakTime: store.get("breakTime")
}
```

Once created in the `main.js` file, these values are modified as accessed in different processes like this:

```javascript
  // Getting the Global Variable.
  workTime = remote.getGlobal('timer').workTime
  breakTime = remote.getGlobal('timer').breakTime

  // Setting the Global Variable from input
  remote.getGlobal('timer').workTime = workTime.value
  remote.getGlobal('timer').breakTime = breakTime.value
```

---

## Development Updates

The update log can be found [Here](https://github.com/jerichoi224/interval-timer/blob/master/update.md)

## Repository

You can view the source code for app here

[Github Repo](https://github.com/jerichoi224/interval-timer)

[1]:/assets/images/projects/interval_timer/1.png
[2]:/assets/images/projects/interval_timer/2.png
