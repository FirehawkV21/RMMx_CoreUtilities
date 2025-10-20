/*:
 *
 * @plugindesc R2.00 || Provides automatic crash and error reports to the developer using Sentry.
 * @author AceOfAces
 * @target MV MZ
 * @url https://studioace.wordpress.com/projects/sentry-integration-for-rpg-maker/
 *
 * @param Setup
 *
 * @param dsn
 * @text DSN
 * @parent Setup
 * @type text
 * @desc The key that is necessary to send data to.
 * @default <autentication_token>[at]sentry.io/<project-id>
 *
 * @param releaseTag
 * @text Release Tag
 * @parent Setup
 * @desc The tag that is used to denote a release.
 * @default my-project-name[at]1.0.0
 *
 * @param environmentTag
 * @text Environment Tag
 * @type text
 * @parent Setup
 * @desc The tag used to split releases. Handy if you have multiple releases (eg. Stable, Beta, Alpha, etc.)
 * @default dev
 *
 * @param defaultSetting
 * @text Default Setting
 * @parent Setup
 * @desc Which will be the default?
 * @type boolean
 * @on Send
 * @off Don't send
 * @default false
 *
 * @param releaseHealth
 * @text Release Health
 * @parent Setup
 * @desc Should Sentry report the session's status? This is helpful for diagnosing regressions.
 * @type boolean
 * @on Send
 * @off Don't send
 * @default false
 *
 *
 * @param sendDeviceInfo
 * @text Send Device Info
 * @parent Setup
 * @desc Should Sentry record some information about the device? Helpful for diagnosing device-related issues (desktop only).
 * @type boolean
 * @on Send
 * @off Don't send
 * @default false
 *
 * @param Offline Support
 * @parent Setup
 *
 * @param dbName
 * @text Database Name
 * @parent Offline Support
 * @default sentry-offline
 * @desc The name for the IndexedDB database (that will hold the events).
 *
 * @param dbStoreName
 * @text Storage Name
 * @parent Offline Support
 * @default GameName
 * @desc Name of the IndexedDB object store that will hold the events.
 *
 * @param offlineEventStorageCount
 * @text Maximum Events Stored Offline
 * @parent Offline Support
 * @desc How many events can be stored when the user is offline? (Default: 30)
 * @type Number
 * @min 1
 * @default 30
 *
 * @param flushAtBoot
 * @text Flush at startup
 * @parent Offline Support
 * @type boolean
 * @default true
 * @on Flush
 * @off Don't flush
 * @desc Should Sentry flush events shortly after startup?
 *
 * @param Options
 *
 * @param sentryBreadcrumbs
 * @text Maximum Breadcrumbs
 * @parent Options
 * @type Number
 * @min 1
 * @default 100
 * @desc Sets the maximum number of breadcrumbs to send to Sentry (Default: 100)
 *
 * @param allowList
 * @text Allow List
 * @parent Options
 * @type text[]
 * @desc A list of domains that will be allowed for exception capturing. Leave this empty if you want to allow all sites.
 * @default []
 *
 * @param denyList
 * @text Deny List
 * @parent Options
 * @type text[]
 * @desc A list of sites that will not be allowed for exception capturing.
 * @default []
 *
 * @param forceReporting
 * @text Debug mode
 * @parent Options
 * @type boolean
 * @on On
 * @off Off
 * @desc If true, Sentry will show debug messages and send exceptions during playtesting. Helpful for testing the integration.
 * @default false
 *
 * @param optionsName
 * @text Options Name
 * @parent Options
 * @desc The name of the setting in the options menu.
 * @default Auto-Upload Error Reports
 *
 * @param feedbackConfig
 * @text Feedback Options
 *
 * @param Feedback Screen
 * @parent feedbackConfig
 *
 * @param feedbackWidget
 * @text Feedback Widget
 * @parent feedbackConfig
 *
 * @param showFeedbackButton
 * @parent feedbackWidget
 * @text Show Feedback Button
 * @desc If turned on, it will show Sentry's default Feedback Button.
 * @type boolean
 * @on Show
 * @off Hide
 * @default false
 *
 * @param feedbackButtonText
 * @parent feedbackWidget
 * @text Feedback Widget Button Text
 * @default Comments?
 * @desc Adjusts the text for the feedback button
 *
 * @param feedbackWidgetTitle
 * @text Feedback Widget Title
 * @parent feedbackWidget
 * @default Feedback
 * @desc The title for the feedback widget.
 *
 * @param feedbackSendButtonText
 * @text Send Feedback Button text
 * @parent feedbackWidget
 * @default Send
 * @desc The text that the "Send" button will have.
 *
 * @param feedbackSuccessText
 * @text Success Message
 * @default Thank you for your feedback!
 * @parent feedbackWidget
 * @desc The text that will be shown when the feedback is sent.
 *
 * @param feedbackFailText
 * @text Failure Message
 * @default Ack! An error occured. Try again later.
 * @parent feedbackWidget
 * @desc The text that will be shown when the feedback wasn't sent.
 *
 * @param feedbackScreenTitle
 * @text Screen Title
 * @type text
 * @parent Feedback Screen
 * @desc The title of the feedback screen.
 * @default Ack! The game crashed.
 *
 * @param feedbackScreenSubtitle1
 * @text Screen Subtitle 1
 * @parent Feedback Screen
 * @desc This is the text that is shown below the title.
 * @default The crash has been reported to the dev.
 *
 * @param feedbackScreenSubtitle2
 * @text Screen Subtitle 2
 * @parent Feedback Screen
 * @desc The second subtitle.
 * @default You can help in diagnosing the issue by providing some details.
 *
 * @param feedbackScreenNameField
 * @text Name Field Label
 * @parent Feedback Screen
 * @desc The label for the Name field.
 * @default Name (Real, Nickname, whatever)
 *
 * @param feedbackScreenEmailField
 * @text Email Field Label
 * @parent Feedback Screen
 * @desc The label for the Email field.
 * @default Email
 *
 * @param feedbackScreenCommentsFieldLabel
 * @text Comments Field Label
 * @parent Feedback Screen
 * @desc The label for the Comments field.
 * @default What happened?
 *
 * @param feedbackScreenSentLabel
 * @text Feedback Sent Label
 * @parent Feedback Screen
 * @desc The text shown when the feedback was sent successfully.
 * @default Thank you for your feedback! You may now re-launch the game by pressing F5 (or closing and opening the game).
 *
 * @help
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Sentry Integration for RPG Maker MV - Version R2.00
 * Developed by AceOfAces
 * Licensed under the Apache 2.0 license. Can be used for both non-commercial
 * and commercial games.
 * Please credit me as AceOfAces when you use this plugin.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * This plugin allows developers to receive automated crash reports when the
 * game crashes. This can be a life-saver, especially if the players don't
 * bother to report bugs. You can even use this plugin to catch errors in
 * the code as well.
 * This plugin uses Sentry as a base.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Installation and setup:
 * 1. Sign up to Sentry (https://sentry.io). We'll need a DSN for this.
 * 2. Once you've signed up, you'll be asked to create a project.
 * follow the instructions (make sure to select JavaScript as the
 * programming language).
 * 3. Either download the CDN version over to:
 * https://browser.sentry-cdn.com/x.xx.x/bundle.feedback.min.js
 * (Change it over to the latest version, see the Sentry documentation)
 * and save it on js/libs folder as sentry.js
 * or copy the HTML tag that Sentry gives you.
 * 4. Add the tag to the index.html file, right after the pixi.js tag in
 * index.html (RPG Maker MV) or in main.js -> scriptUrls (RPG Maker MZ)
 * like this: "js/libs/sentry.js",
 * 5. Now, let's set up your project. Do the following:
 *  - Put the plugin in the top area of the plugin list. This is important,
 *  since we need to initialize the library before the game starts up.
 *  - If you use Yanfly's Core Engine or Olivia's Player Anti-Stress plugin,
 *  we'll need to patch them. Open the plugin(s) with notepad or a code
 *  editor, find the SceneManager.catchException and add the line:
 *  FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'code');
 *  Underneath the line:
 *  SceneManager.catchException = function(e){
 *  - Once this is done, you'll need to fill in the data necessary to
 *  initialize the SDK. Copy the DSN (see the init code in the setup page),
 *  the the version and environment tags you've set up over to this
 *  plugin's parameters. Make sure to replace [at] with the [at]
 *  symbol and switch the 'Debug Mode' to On.
 * 6. Once the project's set up, we'll need to test it out. Take any
 * plugin and add a myfunction1(); in another function. The AltMenuScreen
 * plugin is a good candidate.
 * 7. If the game crashes and Sentry has an entry for the error, the
 * plugin's set up correctly. Set the 'Debug Mode' option to
 * Off. Make sure to also remove the myfunction1(); as well.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Plugin API
 * The plugin has a pretty simple API that can integrate easily
 * to the game's code. Most of the work is done by using this method:
 *
 * FirehawkADK.SentryIntegration.ReportEvent(e,reportLevel,reporttag1,reporttag2);
 *
 * This tag will send a report, alongside the error stack, breadcrumbs,
 * game information (version and environment tags), Operating System
 * and the tags you've specified. The arguments used are:
 * e: The The object that has the error stack. Look for catchException
 * or something similar. This is required.
 * reportLevel: The severity of the even (info, warning, error, fatal).
 * Look at the Sentry's documentation for more information.
 * This is also required.
 * report_tag: These are used for categorization purposes.
 *
 * FirehawkADK.SentryIntegration.SendMessage(message);
 * Plugin command: SendMessage "Message"
 * Send a message to Sentry. This is useful with some instances.
 *
 * FirehawkADK.SentryIntegration.AddBreadcrumb(message, category, level);
 * Plugin command: AddBreadcrumb "Message" "Category" "Level"
 * Attaches a custom breadcrumb to the report. This can be useful for
 * adding better context when diagnosing issues.
 *
 * The plugin parameters break down like this:
 *
 * DSN: This is the key that the service gives you.
 * Release Tag: For organizational purposes. Let's you attach a custom version.
 * Environment Tag: This denotes the type of the game. This helps in breaking
 * down the game versions a little further. Game version 1.0.0 that has the tag
 * dev is different from game version 1.0.0 and tag release.
 * Default Setting: This sets the default setting that the game will have.
 * For some countries, you may have to set this to 'Don't send', in order to
 * comply with laws regarding privacy.
 * Max Breadcrumbs: This is the maximum number of breadcrumbs that will be
 * sent with the report. Adjust this to your needs.
 * Allow list and Block list: This is more useful when the game is
 * hosted on a server. You can set the allow and block list of sites
 * that Sentry will be tracking for reports (CDN sites, for example).
 * Release Health: If this is turned on, Sentry will record the session
 * Debug Mode: This enables Sentry's debug mode and lets the plugin send
 * reports during debugging the game.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * About Device Info
 *
 * This option will allow Sentry to send select information about the device
 * the game runs on. This may be useful for diagnosing some specific issues.
 * Please note that this only works with the Windows, Mac and Linux builds
 * of your game. The details that are collected are:
 * OS version, Free and Total RAM and CPU Name, Speed and the architecture
 * that NW.js is built for.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Feedback Screen and Widget
 *
 * Starting with version R2.00, you can add Sentry's Feedback Widget by flipping
 * the 'Show Feedback Button' option to On. This will add a small button
 * to the game's UI that opens the feedback form. You can adjust the
 * text that the button will have, as well as the title of the widget,
 * the text of the Send button, the success and failure messages.
 * If you want to customise the widget, you'll need to edit the css file that
 * the game uses. Either in fonts/gamefont.css or in css/game.css. See
 * Sentry's documentation for it:
 * https://docs.sentry.io/platforms/javascript/user-feedback/configuration/#user-feedback-widget
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * What's next?
 * -Make sure that your Sentry account is secured. Use a strong
 * password and 2 Factor Authentication.
 * -Do *not*, under any circumstances, share the DSN key.
 * Encrypt the game properly and compile the game's source code.
 * If you need an easy tool to compile the game's code, take a
 * look at my other project:
 * https://studioace.wordpress.com/projects/rmcooktooldx/
 * -Make sure that you do not include any personal info without
 * disclosing this. Especially if you decide to edit this plugin.
 * Sentry provides a data scrubber, so make sure to set this up.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
let pluginVer = "R2.00";
console.info("Sentry Integration " + pluginVer + ". Using Sentry SDK " + Sentry.SDK_VERSION + ".");

var FirehawkADK = FirehawkADK || {};
FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
FirehawkADK.SentryIntegration = FirehawkADK.SentryIntegration || {};

// Reference the Plugin Manager's parameters.
var paramdeck = PluginManager.parameters('FSDK_SentryIntegration');
//Create the global Parameter Deck.
FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
//Load variables set in the Plugin Manager.
FirehawkADK.ParamDeck.SentryDSN = String(paramdeck['dsn']);
FirehawkADK.ParamDeck.SentryReleaseTag = String(paramdeck['releaseTag']);
FirehawkADK.ParamDeck.SentryEnvironmentTag = String(paramdeck['environmentTag']);
FirehawkADK.ParamDeck.SentryActivationFlag = String(paramdeck['defaultSetting']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryForceFlag = String(paramdeck['Force Reporting']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryActivationOptionName = String(paramdeck['optionsName']);
FirehawkADK.ParamDeck.SentryFeedbackScreenTitle = String(paramdeck['feedbackScreenTitle']);
FirehawkADK.ParamDeck.SentryFeedbackScreenSubtitle = String(paramdeck['feedbackScreenSubtitle1']);
FirehawkADK.ParamDeck.SentryFeedbackScreenSubtitle2 = String(paramdeck['feedbackScreenSubtitle2']);
FirehawkADK.ParamDeck.SentryFeedbackScreenNameField = String(paramdeck['feedbackScreenNameField']);
FirehawkADK.ParamDeck.SentryFeedbackScreenEmailField = String(paramdeck['feedbackScreenEmailField']);
FirehawkADK.ParamDeck.SentryFeedbackScreenCommentsField = String(paramdeck['feedbackScreenCommentsFieldLabel']);
FirehawkADK.ParamDeck.SentryFeedbackScreenSuccessMessage = String(paramdeck['feedbackScreenSentLabel']);
FirehawkADK.ParamDeck.SentryReportGameHealth = String(paramdeck['releaseHealth']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryReportDeviceInfo = String(paramdeck['sendDeviceInfo']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryMaxEventsStored = parseInt(paramdeck['offlineEventStorageCount']);
FirehawkADK.ParamDeck.SentryMaxBreadcrumbs = parseInt(paramdeck['maxBreadcrumbs']);
FirehawkADK.ParamDeck.SentryCaptureLevels = (paramdeck['consoleCapture']);
FirehawkADK.ParamDeck.SentryAllowList = (paramdeck['allowList']);
FirehawkADK.ParamDeck.SentryDenyList = (paramdeck['denyList']);
FirehawkADK.ParamDeck.SentryShowDefaultFeedbackButton = String(paramdeck['showFeedbackButton']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryFeedbackWidgetButtonText = String(paramdeck['feedbackButtonText']);
FirehawkADK.ParamDeck.SentryFeedbackWidgetTitle = String(paramdeck['feedbackWidgetTitle']);
FirehawkADK.ParamDeck.SentryFeedbackWidgetSendButtonText = String(paramdeck['feedbackSendButtonText']);
FirehawkADK.ParamDeck.SentryFeedbackWidgetSuccessText = String(paramdeck['feedbackSuccessText']);
FirehawkADK.ParamDeck.SentryFeedbackWidgetFailText = String(paramdeck['feedbackFailText']);
FirehawkADK.ParamDeck.SentryOfflineObjectsLimit = parseInt(paramdeck['offlineEventStorageCount']) || 30;
FirehawkADK.ParamDeck.SentryOfflineStorageName = String(paramdeck['dbName']);
FirehawkADK.ParamDeck.SentryOfflineObjectStorage = String(paramdeck['dbStoreName']);
FirehawkADK.ParamDeck.SentryFlushOfflineEvents = String(paramdeck['flushAtBoot']).trim().toLowerCase() === 'true';

var isFormActive = false;
const feedback = Sentry.feedbackIntegration({
    showName: false,
    showEmail: false,
    autoInject: FirehawkADK.ParamDeck.SentryShowDefaultFeedbackButton,
    triggerLabel: FirehawkADK.ParamDeck.SentryFeedbackWidgetButtonText,
    formTitle: FirehawkADK.ParamDeck.SentryFeedbackWidgetTitle,
    submitButtonLabel: FirehawkADK.ParamDeck.SentryFeedbackWidgetSendButtonText,
    successMessageText: FirehawkADK.ParamDeck.SentryFeedbackWidgetSuccessText,
    messagePlaceholder: "Tell us your feedback. Or the bug you've encountered.",
    nameLabel: FirehawkADK.ParamDeck.SentryFeedbackScreenNameField,
    emailLabel: "Email",
    messageLabel: FirehawkADK.ParamDeck.SentryFeedbackScreenCommentsField,
    colorScheme: "dark",
    onFormOpen: () => { isFormActive = true },
    onFormClose: () => { isFormActive = false },
});

//The initialization code.
Sentry.init({
    dsn: FirehawkADK.ParamDeck.SentryDSN,
    release: FirehawkADK.ParamDeck.SentryReleaseTag,
    environment: FirehawkADK.ParamDeck.SentryEnvironmentTag,
    autoSessionTracking: FirehawkADK.ParamDeck.SentryReportGameHealth,
    maxBreadcrumbs: FirehawkADK.ParamDeck.SentryMaxBreadcrumbs,
    transport: (typeof Sentry.makeBrowserOfflineTransport !== 'undefined') ? Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport) : null,
    transportOptions: {
        dbName: FirehawkADK.ParamDeck.SentryOfflineStorageName,
        storeName: FirehawkADK.SentryOfflineObjectStorage,
        maxQueueSize: FirehawkADK.ParamDeck.SentryOfflineObjectsLimit,
        flushAtStartup: FirehawkADK.ParamDeck.SentryFlushOfflineEvents
    },
    integrations: [
        feedback,
    ],
    beforeSend(event) {
        // Check if it is an exception, and if so, show the report dialog
        if (event.exception && event.level == 'fatal') {
            Sentry.showReportDialog({
                eventId: event.event_id,
                title: FirehawkADK.ParamDeck.SentryFeedbackScreenTitle,
                subtitle: FirehawkADK.ParamDeck.SentryFeedbackScreenSubtitle,
                subtitle2: FirehawkADK.ParamDeck.SentryFeedbackScreenSubtitle2,
                labelName: FirehawkADK.ParamDeck.SentryFeedbackScreenNameField,
                labelEmail: FirehawkADK.ParamDeck.SentryFeedbackScreenEmailField,
                labelComments: FirehawkADK.ParamDeck.SentryFeedbackScreenCommentsField,
                successMessage: FirehawkADK.ParamDeck.SentryFeedbackScreenSuccessMessage,
                allowList: FirehawkADK.ParamDeck.SentryAllowList,
                denyList: FirehawkADK.ParamDeck.SentryDenyList,
                enabled: (!FirehawkADK.ParamDeck.SentryForceFlag && Utils.isOptionValid('test')) ? false : true,
                debug: (FirehawkADK.ParamDeck.SentryForceFlag && Utils.isOptionValid('test')) ? true : false
            });
        }
        return event;
    }
});

document.addEventListener('keydown', async function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        // Your action here
        const form = await feedback.createForm();
        form.appendToDom();
        form.open();
        // Add your desired action or function call here
    }
});

//Initialize config.
ConfigManager.SentryUploadReports = FirehawkADK.ParamDeck.SentryActivationFlag;

FirehawkADK.SentryIntegration.GetGameVersion = function () {
    return FirehawkADK.ParamDeck.SentryReleaseTag.replace(/([^@\s]+)@/, '');
}

FirehawkADK.SentryIntegration.GetReleaseEnvironment = function () {
    var string = FirehawkADK.ParamDeck.SentryEnvironmentTag;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

FirehawkADK.SentryIntegration.PrepConfig = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = FirehawkADK.SentryIntegration.PrepConfig.call(this);
    config.SentryUploadReports = this.SentryUploadReports;
    return config;
};

FirehawkADK.SentryIntegration.ApplyConfig = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    FirehawkADK.SentryIntegration.ApplyConfig.call(this, config);
    this.SentryUploadReports = (config['SentryUploadReports'] != undefined) ? config['SentryUploadReports'] : FirehawkADK.ParamDeck.SentryActivationFlag;
};

if (Utils.RPGMAKER_NAME === 'MV') {
    //The plugin command code.
    FirehawkADK.SentryIntegration.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        FirehawkADK.SentryIntegration.Game_Interpreter_pluginCommand.call(this, command, args)
        switch (command) {
            case 'AddBreadcrumb':
                FirehawkADK.SentryIntegration.AddBreadcrumb(args[0], args[1], args[2]);
                break;
            case 'SendMessage':
                FirehawkADK.SentryIntegration.SendMessage(args[0]);
                break;
        }
    }

    //Re-write catchException
    SceneManager.catchException = function (e) {
        if (e instanceof Error) {
            Graphics.printError(e.name, e.message);
            console.error(e.stack);
        } else {
            Graphics.printError('UnknownError', e);
        }
        AudioManager.stopAll();
        FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'code');
        this.stop();

    };

    Input._onKeyDown = function (event) {
        if (!isFormActive) {
            if (this._shouldPreventDefault(event.keyCode)) {
                event.preventDefault();
            }
            if (event.keyCode === 144) {    // Numlock
                this.clear();
            }
            var buttonName = this.keyMapper[event.keyCode];
            if (ResourceHandler.exists() && buttonName === 'ok') {
                ResourceHandler.retry();
            } else if (buttonName) {
                this._currentState[buttonName] = true;
            }
        }
    };

    Input._onKeyUp = function (event) {
        if (!isFormActive) {
            var buttonName = this.keyMapper[event.keyCode];
            if (buttonName) {
                this._currentState[buttonName] = false;
            }
            if (event.keyCode === 0) {  // For QtWebEngine on OS X
                this.clear();
            }
        }

        TouchInput.isPressed = function () {
            if (!isFormActive) return this._mousePressed || this._screenPressed;
            else return false;
        };

        TouchInput.isTriggered = function () {
            if (!isFormActive) return this._triggered;
            else return false;
        };

        TouchInput.isRepeated = function () {
            if (!isFormActive) {
                return (this.isPressed() &&
                    (this._triggered ||
                        (this._pressedTime >= this.keyRepeatWait &&
                            this._pressedTime % this.keyRepeatInterval === 0)));
            }
            else return false;
        };

        TouchInput.isLongPressed = function () {
            if (!isFormActive) return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
            else return false;
        };

        TouchInput.isCancelled = function () {
            if (!isFormActive) return this._cancelled;
            else return false;
        };


        TouchInput.isMoved = function () {
            if (!isFormActive) return this._moved;
            else return false;
        };

        TouchInput.isReleased = function () {
            if (!isFormActive) return this._released;
            else return false;
        };
    };

}

else if (Utils.RPGMAKER_NAME === 'MZ') {
    SceneManager.catchException = function (e) {
        if (e instanceof Error) {
            this.catchNormalError(e);
            FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'code');
        } else if (e instanceof Array && e[0] === "LoadError") {
            this.catchLoadError(e);
            FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'load');
        } else {
            this.catchUnknownError(e);
            FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'unknown');
        }
        this.stop();
    };

    Input._onKeyUp = function (event) {
        if (!isFormActive) {
            const buttonName = this.keyMapper[event.keyCode];
            if (buttonName) {
                this._currentState[buttonName] = false;
            }
        };
    }

    Input._onKeyDown = function (event) {
        if (!isFormActive) {
            if (this._shouldPreventDefault(event.keyCode)) {
                event.preventDefault();
            }
            if (event.keyCode === 144) {
                // Numlock
                this.clear();
            }
            const buttonName = this.keyMapper[event.keyCode];
            if (buttonName) {
                this._currentState[buttonName] = true;
            }
        };
    }

    TouchInput.isClicked = function () {
        if (!isFormActive) return this._clicked;
        else return false;
    };

    TouchInput.isPressed = function () {
        if (!isFormActive) return this._mousePressed || this._screenPressed;
        else return false;
    };

    TouchInput.isTriggered = function () {
        if (!isFormActive) return this._currentState.triggered;
        else return false;
    };

    TouchInput.isRepeated = function () {
        if (!isFormActive) {
            return (
                this.isPressed() &&
                (this._currentState.triggered ||
                    (this._pressedTime >= this.keyRepeatWait &&
                        this._pressedTime % this.keyRepeatInterval === 0))
            );
        } else return false;
    };

    TouchInput.isLongPressed = function () {
        if (!isFormActive) return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
        else return false;
    };

    TouchInput.isCancelled = function () {
        if (!isFormActive) return this._currentState.cancelled;
        else return false;
    };

    TouchInput.isMoved = function () {
        if (!isFormActive) return this._currentState.moved;
        else return false;
    };

    TouchInput.isHovered = function () {
        if (!isFormActive) return this._currentState.hovered;
        else return false;
    };

    TouchInput.isReleased = function () {
        if (!isFormActive) return this._currentState.released;
        else return false;
    };
}

//Re-write the exit code so Sentry can finish up any work needed.
SceneManager.exit = function () {
    Sentry.close(10000);
    this.goto(null);
    this._exiting = true;
};

//Implements the error report code. Edit this if you want to adjust how the library will collect information.
FirehawkADK.SentryIntegration.ReportEvent = function (e, reportLevel, report_tag1, report_tag2) {
    Sentry.getCurrentScope().setTag(report_tag1, report_tag2).setLevel(reportLevel);
    if (reportLevel == 'fatal') {
        Sentry.setContext("game_internals", {
            'engine_gen': Utils.RPGMAKER_NAME,
            'engine_version': Utils.RPGMAKER_VERSION
        });
        if (!DataManager.isEventTest() && !DataManager.isBattleTest())
            Sentry.setContext('location', {
                'current_map': $dataMapInfos[$gameMap.mapId()].name,
                'position_x': $gamePlayer._realX,
                'position_y': $gamePlayer._realY,
                'has_collided': $gamePlayer.isCollidedWithEvents(),
                'is_in_vehicle': $gamePlayer.isInVehicle(),
                'map_region_id': $gameMap.regionId($gamePlayer._realX, $gamePlayer._realY),
                'is_fighting': $gameParty._inBattle

            });
        if (Utils.isNwjs() && FirehawkADK.ParamDeck.SentryReportDeviceInfo) {
            var deviceinternals = require('os');
            var cpuData = deviceinternals.cpus();
            Sentry.setContext('device_internals', {
                'system_ram': deviceinternals.totalmem() / 1048576,
                'system_ram_free': deviceinternals.freemem() / 1048576,
                'system_cpu': cpuData[0].model,
                'system_cpu_speed': cpuData[0].speed,
                'system_os_version': deviceinternals.version(),
                'system_os_build': deviceinternals.release()
            });
        }
    }
    if ((!Utils.isOptionValid('test') && ConfigManager.SentryUploadReports)) Sentry.captureException(e);
};

//Implements the manual breadcrumb code.
FirehawkADK.SentryIntegration.AddBreadcrumb = function (message, category, level) {
    if ((!Utils.isOptionValid('test') && ConfigManager.SentryUploadReports)) Sentry.addBreadcrumb({
        message: message,
        category: category,
        level: level
    });
}

//Implements the send message code.
FirehawkADK.SentryIntegration.SendMessage = function (message) {
    if ((!Utils.isOptionValid('test') && ConfigManager.SentryUploadReports)) Sentry.captureMessage(message);
}




//Add the setting to the Options menu.
FirehawkADK.SentryIntegration.RegisterSetting = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
    FirehawkADK.SentryIntegration.RegisterSetting.call(this);
    this.addCommand(FirehawkADK.ParamDeck.SentryActivationOptionName, 'SentryUploadReports');
};