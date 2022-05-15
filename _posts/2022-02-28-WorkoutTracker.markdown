---
title: "Workout Tracker 🏋️"
layout: post
date: 2022-02-28 01:28
tag: 
- Flutter
- Mobile Development
image: /assets/images/projects/workout_tracker/thumbnail.png
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Simple application for tracking workouts"
category: project
author: danielchoi
externalLink: false
---

## Summary
The purpose of this app is to keep track of mainly workouts I do at the gym. I would always forget previous weights I did with each machine, and I thought it would be nice to have an app to keep track of the weights I did and also show how I've been doing in terms of increase in the weights I use for workouts. While there were many apps on the store that did what I want, I found most of them not to have the ideal UX I was hoping, along with price ranges that I thought wasn't worth what I needed. 

This was a my second app made using Flutter, and I think I've improved greatly compared to my previous app. This app supports multiple langauges and uses a no-sql database called objectbox. I feel like those two were the huge learning points I had in developing this app, so here's a short summary of how I did it.

### Database (objectbox)

Like I mentioned above, the database I used for this project was [objectbox](https://objectbox.io/flutter-database/). The main reason I decided to use this instead of sqflite was due to the complicated data structure. Below is an image showing how I designed the data structures for this app.

![Markdown Image][1]
<figcaption class="caption">Class Diagram for the project</figcaption>

I have multiple objects and lists inside of another class, and while this could be designed with sql database as well, I wasn't comfortable enough with SQL, that I would probably end up with a rather inefficient database design. Since Objectbox defines and works with data as classes rather than tables, I thought it would be a much better choice for me. Below is a sample code for the SessionItem class defined in the image above.

```dart
import 'package:objectbox/objectbox.dart';
import 'package:workout_tracker/dbModels/set_item_model.dart';

@Entity()
class SessionItem {
  int id = 0;
  int time = 0;
  String metric = "";
  int workoutId = 0;
  final sets = ToMany<SetItem>();
}
```

### Multilingual Support

While I only supported different currencies in my previous app, multilingual support for all the strings in the app was added using flutter's native [internationalization process](https://docs.flutter.dev/development/accessibility-and-localization/internationalization). While there seems to be [plugins](https://pub.dev/packages/easy_localization) to make this process even easier, I think flutter's way wasn't that bad either. There were some annoyances in that Android Studio wouldn't be able to find the objects used for translation once the dependencies of the projects were reloaded, it wasn't too bad.

Below is an example of how I used flutter's localization method to translate the navigation bar.

l10n/app_en.arb
```json
{
    "dashboard": "Dashboard",
    "workout": "Workout",
    "routine": "Routine",
    "calendar": "Calendar",
    "settings": "Settings",
}
```


l10n/app_kr.arb
```json
{
    "dashboard": "대시보드",
    "workout": "운동",
    "routine": "루틴",
    "calendar": "기록",
    "settings": "설정",
}
```

.arb files for each language is required, so that depending on the locale set for the app, the app will use the strings from each file. Below shows how you can set the locale of the app.

```dart
 @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Workout Tracker',
        theme: ThemeData(
          brightness: Brightness.light,
          primarySwatch: Colors.amber,
        ),
        localizationsDelegates: [AppLocalizations.delegate, MaterialLocalizationKrDelegate(), CupertinoLocalizationKrDelegate()],
        supportedLocales: AppLocalizations.supportedLocales,
        locale: _locale,
        home: MainApp(),
        routes: <String, WidgetBuilder>{
          '/home': (BuildContext context) => new HomeWidget(parentCtx: context, objectbox: objectbox),
          '/splash': (BuildContext context) => new InstructionWidget(parentCtx: context, objectbox: objectbox),
        }
    );
  }
}
```

Once the locale is set, the strings can be set like below. 

```dart
bottomNavigationBar: BottomNavigationBar(
            selectedItemColor: Theme.of(widget.parentCtx).colorScheme.secondary,
            type: BottomNavigationBarType.fixed,
            onTap: onTabTapped, // new
            currentIndex: HomeWidget._currentIndex, // new
            items: [
              BottomNavigationBarItem(
                icon: new Icon(Icons.fitness_center),
                label: AppLocalizations.of(context)!.workout,
              ),
              BottomNavigationBarItem(
                icon: new Icon(Icons.repeat),
                label: AppLocalizations.of(context)!.routine,
              ),
              BottomNavigationBarItem(
                icon: new Icon(Icons.insert_chart_outlined),
                label: AppLocalizations.of(context)!.dashboard,
              ),
              BottomNavigationBarItem(
                icon: new Icon(Icons.calendar_today),
                label: AppLocalizations.of(context)!.calendar,
              ),
              BottomNavigationBarItem(
                icon: new Icon(Icons.settings),
                label: AppLocalizations.of(context)!.settings,
              ),
            ],
          ),
```

### Final Thoughts

Overall, I think this was a nice project to learn many of the functionalities in Flutter. While I am done with it for now, and there probably won't be much users since I have no plans to advertise this, I might keep updating if I can think of any improvements. I've been mainly building apps that don't require servers due to financial issues, but I hope in the future I can start building apps with a better infrastrucure.

## Play Store
Check it out if you're interested.

[Play Store](https://play.google.com/store/apps/details?id=com.kahluabear.workout_tracker)


[1]:/assets/images/projects/workout_tracker/workout_tracker_class.png