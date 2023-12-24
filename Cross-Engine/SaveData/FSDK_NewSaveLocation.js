//==============================================
// New Save Location
// Version R1.00
// Developed by Dragonhouse Software (AceOfaces)
// Licensed under the Apache 2.0 License
//==============================================

/*:
* @target MV MZ
* @author AceOfAces
* @plugindesc R1.00 || Changes the save location. Recommended for users of RPG maker Cook Tool Deluxe
*
* @param preferredLocation
* @text Preferred Location
* @type select
* @option Exe location
* @value 0
* @option App Data
* @value 1
* @option User folder
* @value 2
* @default 0
* @desc What's the preferred location for the save files?
*
* @param windowsPath
* @text Folder Location (Windows)
* @default Saved Games/Game Name
* @desc Select the folder location for Windows builds.
*
* @param unixPath
* @text Folder Location (Linux and Mac)
* @default Game Dev/Game Name
* @desc Select the folder location for Linux and Mac builds.
*
* @param saveFolderName
* @text Save Folder Name
* @default save/
* @desc The name of the save folder. Must end with '/'.
*
* @help
* ==============================================================
* New Save Location
* Version R1.00
* Developed by AceOfAces. Licensed under the Apache 2.0 license.
* ==============================================================
*/

(function () {
    var FirehawkADK = FirehawkADK || {};
    FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
    // Reference the Plugin Manager's parameters.
    var paramdeck = PluginManager.parameters('FSDK_NewSaveLocation');
    FirehawkADK.ParamDeck.PreferredLocationId = parseInt(paramdeck['preferredLocation']);
    FirehawkADK.ParamDeck.WinSaveLocation = String(paramdeck['windowsPath']);
    FirehawkADK.ParamDeck.UnixLocation = String(paramdeck['unixPath']);
    FirehawkADK.ParamDeck.SaveFolderName = String(paramdeck['saveFolderName']);

    var path = require('path');
    var systeminternals = require('os');
    var home = systeminternals.homedir();
    var base = path.dirname(process.mainModule.filename);

    StorageManager.ReadSaveArgument = function () {

        // Access command line arguments
        const args = nw.App.argv;

        // Find the "--save" argument
        const saveArg = args.find(arg => arg.startsWith('--save='));

        if (saveArg) {
            // Extract the folder location
            const folderPath = saveArg.split('=')[1];

            // Use the folderPath as needed in your application
            return folderPath;
        } else {
            return null;
        }

    }

    StorageManager.DetermineUserProfileLocation = function(){
        var fs = require('fs');
        var profilePath = "";
        if (process.platform == "win32")
            profilePath = path.join(home, FirehawkADK.ParamDeck.WinSaveLocation, FirehawkADK.ParamDeck.SaveFolderName);
        else profilePath = path.join(home, FirehawkADK.ParamDeck.UnixLocation, FirehawkADK.ParamDeck.SaveFolderName);
        if (!fs.existsSync(profilePath)) fs.mkdirSync(profilePath, { recursive: true });
        return profilePath;
    }

    StorageManager.DetermineSavePath = function() {
        var selectedPath = this.ReadSaveArgument();
        if (selectedPath != null && selectedPath != "") return selectedPath;
        else switch (FirehawkADK.ParamDeck.PreferredLocationId) {
            case 2:
                if (process.platform == "win32") return this.DetermineUserProfileLocation();
                else return
            case 1:
                const nw = require('nw.gui');
                return path.join(nw.App.dataPath, FirehawkADK.ParamDeck.SaveFolderName);
            case 0:
            default:
                if (Utils.isOptionValid('test')) {
                    return path.join(base, FirehawkADK.ParamDeck.SaveFolderName);
                } else {
                    return path.join(path.dirname(base), FirehawkADK.ParamDeck.SaveFolderName);
                }
        }
    }


    // RMMV Specific patch.
    if (StorageManager.localFileDirectoryPath) {
        StorageManager.localFileDirectoryPath = function () {
            return StorageManager.DetermineSavePath();
        };
    }

    //RMMZ specific patch
    if (StorageManager.fileDirectoryPath) {
        StorageManager.fileDirectoryPath = function () {
            return StorageManager.DetermineSavePath();
        }
    }
})();