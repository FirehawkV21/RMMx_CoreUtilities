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
 * @text Game Data sub-folder
 * @default userdata/
 * @desc The name of the save folder. Must end with '/'.
 *
 * @help
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Advanced Save Handler - Version R1.00
 * Developed by AceOfAces
 * Licensed under the Apache 2.0 license. Can be used for both non-commercial
 * and commercial games.
 * Please credit me as AceOfAces when you use this plugin.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * This cross-engine plugin re-works parts of the save mechanism so it can be
 * customizable and more robust. This is an essential plugin for both users
 * that want to change the location and those who use RPG Maker Cook Tool
 * Deluxe (and it's predecessor, RPG maker MV/MZ Cook Tool). For RPG Maker
 * users, it also fixes a bug where games packed with Enigma Virtual Box
 * cannot save properly.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Installation
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * RPG Maker MV:
 * Put this below plugins that affect the save system (such as Yanfly's Save Core).
 * Then, open the plugin settings and adjust them accordingly.
 *
 * RPG Maker MZ:
 * This is the same as on MV: Put this below any plugins that affect the save system.
 * Then, open the settings and adjust accordingly.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Configuration
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Preferred Location: Selects which base folder should be used. Selecting "Exe
 * location", it will use the game's parent folder (same as default). Selecting
 * "App Data" will set the location to a folder Nwjs reserves. Selecting "User
 * folder", will put the files to the user's folder (recommended).
 *
 * Folder Location: These two versions adjust the save folder's location in
 * the user folder (you can safely ignore these, if you don't use the User
 * folder). You must write the location with "/" as the path separator. The
 * location is set up as follows (with the default settings):
 * Linux & Mac : /home/myusrname/MyGameName/Game Dev/Game Name/userdata/
 * Windows: C:/Users/MyUserName/Saved Games/Game Dev/Game Name/userdata/
 * Game Data sub-folder: This adjusts the name of the folder that will hold
 * the game's data within the selected location (Global, Settings and saves).
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Compatibility
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * RPG Maker MV: Compatible with version 1.6.0 and newer. Older versions may not
 * work properly. Compatible with most plugins. If Yanfly's Save Core is present,
 * it will use its settings for file names.
 * RPG Maker MZ: Compatible with version 1.5.0 and newer. Older versions may not
 * work properly. Compatible with most plugins.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Extra Notes
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * In RPG Maker MV, save files are placed into a folder named "Saves". This is
 * to better organize the files within the save location. This behaviour isn't
 * present on RPG Maker MZ.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

(function () {
    var FirehawkADK = FirehawkADK || {};
    FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
    // Reference the Plugin Manager's parameters.
    var paramdeck = PluginManager.parameters('FSDK_AdvSaveHandler');
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

        StorageManager.saveToLocalFile = function(savefileId, json) {
            var data = LZString.compressToBase64(json);
            var fs = require('fs');
            var dirPath = path.join(this.localFileDirectoryPath(), "Saves/");
            var filePath = this.localFilePath(savefileId);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, data);
        };

        StorageManager.localFilePath = function(savefileId) {
            var name;
            var mover = "";
            if (savefileId < 0) {
                name = (Yanfly.Param.SaveTechLocalConfig != null) ? Yanfly.Param.SaveTechLocalConfig : 'config.rpgsave';
            } else if (savefileId === 0) {
                name = (Yanfly.Param.SaveTechLocalGlobal != null) ? Yanfly.Param.SaveTechLocalGlobal : 'global.rpgsave';
            } else {
                name = (Yanfly.Param.SaveTechLocalSave != null) ? Yanfly.Param.SaveTechLocalSave.format(savefileId) : 'file%1.rpgsave'.format(savefileId);
                mover = "Saves"
            }
            return path.join(this.localFileDirectoryPath(), mover, name);
        };
    }

    //RMMZ specific patch
    if (StorageManager.fileDirectoryPath) {
        StorageManager.fileDirectoryPath = function () {
            return StorageManager.DetermineSavePath();
        }
    }
})();