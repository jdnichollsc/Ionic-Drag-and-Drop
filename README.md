#**The Best Ionic v1.x starter template**

![Ionic Framework + Gulp](https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/ionic_40.png?raw=true)

**Reinventing the wheel, again!** *Sorry Ionic Team... but there are many noobs learning in Youtube!*

> Are you a noob? Use this template.

> Are you a master? Shut up and use this template! Talk is cheap, show me the code (Pull Request).

<div style="text-align:center"><img src ="https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/reinventing.the.wheel.jpg?raw=true" /></div>

#Introduction

You need to obfuscate your code and reduce the size of your mobile applications. With this project you can work with Gulp in the best way, allowing improve your development workflow. This project seeks to improve the following tasks:

- Design your application with a maintainable code using **Sass** and writing less code using **Autoprefixer**. Concatenate and Minify styles in a stylesheet.
- Concatenate and Uglify javascript files using Source maps to debug the code easily.
- Compress images to reduce the size of your application.
- Compress html templates, respecting your structure.
- Clean unnecessary files downloaded with Bower.
- Use CSS animations with **Animate.css**.
- Use **SQLite** with a service pattern. **You can use Pre-filled databases**.

# Demo

Do you want to see this starter in action? Visit https://jdnichollsc.github.io/Ionic-Starter-Template/ yay!
> Automatically deployed to GitHub Pages using Gulp - Check the **last task** into [gulpfile.js](https://github.com/jdnichollsc/Ionic-Starter-Template/blob/master/gulpfile.js)

<img width="242px" height="411px" src="https://s3.amazonaws.com/ionic-marketplace/ionic-starter-template/screenshot_1.png">
<img width="242px" height="411px" src="https://s3.amazonaws.com/ionic-marketplace/ionic-starter-template/screenshot_2.png">
<img width="242px" height="411px" src="https://s3.amazonaws.com/ionic-marketplace/ionic-starter-template/screenshot_3.png">

#Projects using this template
- **[IonPhaser](http://market.ionic.io/plugins/ionphaser)**
- **[Ionic ElastiChat](https://jdnichollsc.github.io/Ionic-ElastiChat-with-Images/)**
- **[Game of Drones (Ionic/Jasmine/Karma/Protractor/Node.js/MongoDB/Mongoose.js)](https://github.com/jdnichollsc/Game-of-Drones)**

> Do you have a project using this template? Let me know to share it with everyone!

#Instructions

1. Download this template.
2. Execute the command `npm install`
3. Execute the command `gulp`
4. Run Ionic: 
   - `ionic serve` to test on the browser **(Gulp is running by default)**.
   - `ionic run android --livereload` to test on the device.
5. Modify this template and create your hybrid mobile app.

#Template Structure

Path         | Explanation
----------   | -------------
`./app/img/` | Images in your app.
`./app/js/`  | Scripts (Controllers, Services, Directives, etc).
`./app/scss/` | The styles of your app using Sass.
`./app/templates/` | Views in your app. (Only html files)
`./app/index.html` | The init page.
`./www/css/` | Other css styles like **[Animate.css](https://daneden.github.io/animate.css/)**, etc.
`./www/lib` | Download scripts using bower.
 	 
#Using bower to download libraries (npm preen included)

* Download the script. Eg: `bower install ionic-datepicker --save`
* Add the path of the files that you will use in `bower.json` from `www/lib`. Eg:
```javascript
"preen": {
	//... More libraries
	"ionic-datepicker": [
		"dist/*.js"
		//Other files and folders will be deleted to reduce the size of your app
	]
}
```
* Run gulp in the CLI. Eg: `gulp` or `gulp lib`
* That's all, folks!!

#Animate elements using **[Animate.css](https://daneden.github.io/animate.css/)**

* Do you want to animate Modals? This template have an example. More examples **[here](https://github.com/kevincobain2000/ionic-animated-modal)**
```javascript
//Using the Modals service in this template
Modals.openModal($scope, 'templates/modals/users.html', 'animated rotateInDownLeft');
```
* Do you want to animate Popups and other elements? See an example:
```javascript
$ionicPopup.alert({
	title: 'Hello World',
	template: 'This is the best template to start with Ionic Framework!',
	cssClass: 'animated bounceInDown'
});
```

#SQLite databases on Android, iOS and Windows (Using **[cordova-sqlite-ext](https://github.com/litehelpers/cordova-sqlite-ext)** plugin)
This template include an example **(pre-populated database)**, you can test in the **browser** using **Google Chrome** or in your **Device**.

![Cordova SQLite](https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/sqlite.png?raw=true)

* **Debug in the browser:** Test using the **`./app/js/queries.js`** file to create your queries **(Drop tables, create tables, insert data, etc)**.
* **Debug in the device:** Test using the **`./www/pre.db`** file, you can edit the database using **[DB Browser for SQLite](http://sqlitebrowser.org/)**

###**Note**: If you don't want to use SQLite, you must perform the following steps:
1. Remove **`./www/pre.db`** file.
2. Remove **`./app/js/queries.js`** file.
3. Remove **`./app/js/services/sqlite.js`** file.
4. Uninstall the plugin using the CLI: **`ionic plugin rm cordova-sqlite-ext --save`**
5. Remove the following line from **`./app/js/app.js`** file:
```javascript
$sqliteService.preloadDataBase(true);
```

#Ionic Tips
* Ionic View LifeCycle: More **[here](http://www.gajotres.net/understanding-ionic-view-lifecycle/)**
```javascript
$scope.$on('$ionicView.beforeEnter', function(){
  alert("Before to enter to the view");
});
$scope.$on('$ionicView.afterEnter', function(){
  alert("After to enter to the view");
});
```
* Reload the current state:
```javascript
$state.go($state.current, {}, {reload: true});
```
* Disable the back option before to navigate to other state:
```javascript
$ionicHistory.nextViewOptions({
    disableBack: true,
    disableAnimate : true,
    historyRoot  : true
});
```
* Clear the cache:
```javascript
$ionicHistory.clearCache();
```
* Clear the history:
```javascript
$ionicHistory.clearHistory();
```
* Change the direction before to navigate to other state:
```javascript
$ionicViewSwitcher.nextDirection('back');
```
* Navigate to other state:
```javascript
$state.go("app.login");
```
* Disable the drag to open the side menu:
```javascript
$ionicSideMenuDelegate.canDragContent(false);
```
* Check the current platform
```javascript
var isWebView = ionic.Platform.isWebView();
```
* Disabling the tap system (To disable the tap for an element and all of its children elements)
```html
<div data-tap-disabled="true">
    <div id="google-map"></div>
</div>
```
* Using Ionic gestures with options from directives
```javascript
$ionicGesture.on('hold', function (e) {
  //Code...
}, element, { hold_threshold: 20 });
```

###**Global configuration**:
* Enable the native scrolling (Enable or Disable jsScrolling):
```javascript
$ionicConfigProvider.scrolling.jsScrolling(false);
```
* Set the Maximum number of view elements to cache in the DOM:
```javascript
$ionicConfigProvider.views.maxCache(5);
```
* Center align the title in the navBar:
```javascript
$ionicConfigProvider.navBar.alignTitle('center');
```
* Disable swipeback on iOS:
```javascript
$ionicConfigProvider.views.swipeBackEnabled(false);
```
* Set the back button text to empty:
```javascript
$ionicConfigProvider.backButton.previousTitleText(false).text('');
```
* Change Ionic gestures options:
```javascript
ionic.Gestures.gestures.Hold.defaults.hold_threshold = 20;
```

#Crosswalk
Improve the performance of your HTML, CSS, and JavaScript if is required.

Command | Action
------- | ------
`ionic browser list` | Show all the browsers available by platform
`ionic browser rm crosswalk` | Remove a browser
`ionic browser add crosswalk` | Install the Chromium browser for Android
`ionic browser add crosswalk@10.39.235.15` | Specifies a version of Chromium
`ionic browser add crosswalk-lite` | Install the Crosswalk lite version
`ionic browser revert android` | Remove any custom browser that was installed for the platform by replacing it with the system default browser

#npm commands
Command | Action
------- | ------
`npm i ionic cordova bower gulp -g` | Install Ionic, Cordova, Bower and Gulp packages globally 
`npm cache clean` | Remove the cache to force update the packages. Useful to solve npm issues using the CLI.

#Ionic commands

Command         | Action
-------------   | -------------
`ionic login`   | To get logged in the CLI and use the Ionic services
`ionic upload`  | Upload your app to Ionic repository and debug remotely (Your clients) using the useful **[Ionic View App](http://view.ionic.io/)** 
`ionic serve`   | Test on the browser
`ionic serve --lab` | Test on the browser iOS and Android version 
`ionic lib update`  | Update Ionic library files
`ionic resources`   | Generate icons and splash screens. The images are located in `./resources/` directory. More info **[here](http://ionicframework.com/docs/cli/icon-splashscreen.html)**.
`ionic resources --icon` | Generate only the icons. `icon.png`, `icon.psd` or `icon.ai` is located in `./resources/` directory
`ionic resources --splash` | Generate only the splash screens. `splash.png`, `splash.psd` or `splash.ai` is located in `./resources/` directory
`ionic resources ios --icon` | Generate icons per platform

#Cordova commands

Command         | Action
--------------- | -----------
cordova platform add `android` | Add the platform to build your app. `android - ios - windows`
cordova platform rm `android` | Remove the platform
cordova plugin add `git_url` --save | Add a plugin to use native capabilities. `Native Devs are your friends`
cordova plugin list | See the plugins that you're using. Find more **[here!](https://cordova.apache.org/plugins/)**
cordova plugin rm `plugin_name` --save | Remove a plugin
cordova build windows -- --appx=8.1-win --archs="x86" | Build the app to Windows (Open the Solution `platforms/windows/*.sln` on **[Visual Studio](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)**)

#Tools

Name            | Description
--------------- | -----------
**[Visual Studio Code](https://code.visualstudio.com/)** | Build and debug your app using a [extension](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools)
**[GapDebug](https://www.genuitec.com/products/gapdebug/)** | Only debug in the device
**[GenyMotion](https://www.genymotion.com/)** | Better Android Emulation

#Visual Studio Code commands and shortcuts
Command/Shortcut        | Action
--------------- | --------------
`code .` | Open the editor
`F1` | Open the `Command Palette`
`Ctrl + Shift + N` | Open other Visual Studio Code instance
`Ctrl + }` | Toogle comment code

#Sign to Android (Commands)

1. `cordova build --release android`
2. `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
3. `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name`
4. `zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk`

#Links

* **[Market place](http://market.ionic.io/)**
* **[Facebook group](https://www.facebook.com/groups/phonegapcordova/)**
* **[Codepen](http://codepen.io/ionic/pens/public/?grid_type=list)**
* **[Spanish Presentation](http://slides.com/juandavidnicholls/apps-moviles)**
* **[Ionic CLI](https://github.com/driftyco/ionic-cli)**
* **[Ionic Framework Examples](https://gist.github.com/jdnichollsc/53bfd200f04fd51c87d5)**
* **[Ionic Services](http://docs.ionic.io/)**

![Your code is mine!](https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/ofuscate.jpg?raw=true)

#Personal comments

* **Ionic, seriously?** The cache is the best... but, How is possible to know if a specific view is cached? (From a directive)

* **Microsoft, seriously?** Help to improve existing cordova plugins instead of create new plugins only for Windows platform!

* **Apple, seriously?** Thanks for nothing! I need a MAC or the help of a friend to build for iOS... Are we playing Who Wants to be a Millionaire?

# Happy coding
Made with <3

<img width="150px" src="http://phaser.azurewebsites.net/assets/nicholls.png" align="right">
