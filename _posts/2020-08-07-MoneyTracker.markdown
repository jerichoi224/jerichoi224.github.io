---
title: "Money Tracker :dollar:"
layout: post
date: 2020-08-07 01:28
tag: 
- Flutter
- Mobile Development
- Open Source
image: /assets/images/projects/money_tracker/thumbnail.jpeg
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Simple application for saving money"
category: project
author: danielchoi
externalLink: false
---

## Summary
The purpose of this app is to keep track of how much money I spent daily, and try to stop myself from spending money when I really shouldn't be. The app basically sets a daily limit on how much money I want to use on average, and manually keeps track of the spendings I make. The app will subtract these spendings from the daily limit, and every day midnight, the remaining daily limit rolls over to the total savings. This way, I can see how much I've been spending, and whether I am able to make some larger spendings than usual.

This was a Personal Project to build an app while also learning how to develop using Flutter. Although this is an app that doesn't really use any advanced techniques or external APIs or anything, it does implement alot of significant parts of mobile developments such as app life cycles, persistent data, multiple page navigations, splash screens and others.

The app source code along the app description can be found as open source in my [github](https://github.com/jerichoi224/MoneyTracker) I'll be going over the code and more of the approaches I took while developing the app.

### App Life Cycle
One significant part of this app was checking midnight. Whenever a day changes, whatever is remaining from the daily limit has to rollover to the total savings. The big issue I found is that if a day changes while the app is online, or "on pause" I need to check the day change. I found this way of detecting the app's "on resume" through stack overflow.

```dart
    SystemChannels.lifecycle.setMessageHandler((msg){
      if(msg==AppLifecycleState.resumed.toString()) {
		  checkNewDay();
		  setState(() {});
      }
      return null;
    });
```

By adding this code snippet on the **onInit()** method of the main widget, then whenever the app resumes, the code runs. What I did find was, that if I add these Message Handlers to other widgets, whichever widget loads later will overwrite any other Message Handlers. I didn't realize this at first, and ended up having alot of repetitive code in multiple files. So its important that this Message Handler is added to one file in the entire app project.

### Persistent Data

Based on the code I found on the [official documentation](https://flutter.dev/docs/cookbook/persistence/sqlite), along with some help from stack overflow, I built my own [database helper](https://github.com/jerichoi224/MoneyTracker/blob/master/lib/database_helpers.dart) with two separate tables: one for spendings, and one for subscriptions.

### Page Navigation

For Page navigation, I used the [PageView](https://api.flutter.dev/flutter/widgets/PageView-class.html) Widget which I found to be an amazingly convenient widget. Its pretty amazing and pairing it with the bottom navigation bar made the UI intuitive and easy to learn. This combination can be found in the [Home Widget](https://github.com/jerichoi224/MoneyTracker/blob/master/lib/HomeWidget.dart) file, but here are some snippets.

```dart
// Creates a controller for the Page View widget
  final pageController = PageController(initialPage: 0);

// Chooses the widgets that correspond to the children/pages in the pageview widget. 
  List<Widget> _children() => [
    SpendMoneyWidget(),
    DisplayWidget(),
    SpendingHistoryWidget()
  ];
  
 // Set the Pageview as the body for the home widget
  body: PageView(
          onPageChanged: (index) {
            FocusScope.of(context).unfocus();
            changePage(index);
          },
          controller: pageController,
          children: children
      ),
	  
	  
// This makes the PageView Change pages on bottom navigation bar tap
  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
      pageController.animateToPage(index, duration: Duration(milliseconds: 500), curve: Curves.ease);
    });
  }
```

### Splash Screen

For the one-time intro splash screen, I just have a simple [SplashWidget](https://github.com/jerichoi224/MoneyTracker/blob/master/lib/SplashWidget.dart) which the [main](https://github.com/jerichoi224/MoneyTracker/blob/master/lib/main.dart) dart file only shows the first time the app is loaded. Once the user sets all the initial values, the widget sets a flag that is never modified again, and thus the one-time splash screen never happens.

For the general splash screen, I simply have flag that waits for all the data to load, and while the data is loading, the homewidget shows a screen with the icon alone.

## Sibling App
While developing Money Tracker, I also wanted to make an app that could be used as a ledger. While I initially thought of comibining the two in one app, I quickly realized that they way Money Tracker keeps track of money and saving does not work together with how a ledger works. So I just decided to take the code of Money Tracker and simply modify the code to make a the [Simple Ledger](https://github.com/jerichoi224/Simple-Ledger) app.

## Repository

You can view the source code for app here

[Github Repo](https://github.com/jerichoi224/MoneyTracker)
