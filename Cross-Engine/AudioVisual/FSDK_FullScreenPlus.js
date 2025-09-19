var FirehawkADK = FirehawkADK || {};
FirehawkADK.ExtraOptions = FirehawkADK.ExtraOptions || {};
FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
FirehawkADK.ExtraOptions.FullscreenPlus = FirehawkADK.ExtraOptions.FullscreenPlus || {};
FirehawkADK.FullscreenPlus = FirehawkADK.FullscreenPlus || {};

/*:
 * @target MV MZ
 * @author AceOfAces
 * @plugindesc R1.00 || Adds a fullscreen toggle, alongside adding support for Windows PC Handhelds.
 *
 * @param defaultFullscreen
 * @text Default Fullscreen
 * @type boolean
 * @on On
 * @off Off
 * @desc Sets whether the game starts in fullscreen mode or not. (true/false)
 * @default false
 *
 * @help
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>=
 * Full Screen +
 * Developer: AceOfAces
 * Version: R1.00
 * Licensed under the Apache License, Version 2.0. OK for non-commercial and
 * commercial use.
 * Please credit me as AceOfAces when you use this plugin.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * This plugin adds a fullscreen toggle to your game, allowing players to
 * switch between fullscreen and windowed mode. In addition, it provides
 * support for Windows PC Handhelds by automatically enabling fullscreen
 * mode when the game is launched with the '--handheld' command line argument
 * (and hide the option, as it's unnecessary for this type of device).
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Installation:
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * 1. Install the plugin by placing it in the 'js/plugins' folder of your
 * RPG Maker project.
 * 2. Open the Plugin Manager and add 'FSDK_FullScreenPlus' to your list of
 * plugins.
 * 3. Configure the 'Default Fullscreen' parameter to set whether the game
 * starts in fullscreen mode or not.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Configuration:
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * - Default Fullscreen: Set this parameter to 'true' if you want the game to
 *   start in fullscreen mode by default. Set it to 'false' if you prefer
 *  windowed mode.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Handheld support:
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Launch the game with the '--handheld' command line argument to
 * automatically enable fullscreen mode and hide the fullscreen toggle
 * option in the settings menu. Check the Microsoft Learn docs for how
 * to check if it's a handheld, if you plan to write your own bootstrap:
 * https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/pc-dev/handheld/handheld-guidance
 * For RPG Maker Cook Tool Deluxe users, ensure you are using R6.01u4
 * or later, as it includes the necessary bootstrap changes.
 * Important: As of the time of writing, handheld support is only available
 * for Windows PC Handhelds that run on Windows 11 or later (currently,
 * only the Asus ROG Xbox Ally will have official support for this, with
 * other handhelds receiving it in the future).
 * For the Steam Deck, you will need to use a plugin that interfaces with
 * Steamworks API to check for handheld or Big Picture Mode, as this plugin
 * does not have that capability (yet).
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Compatibility:
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * RPG Maker MV: Compatible with RPG Maker MV version 1.6.3 and later.
 * RPG Maker MZ: Compatible with RPG Maker MZ version 1.9.0 and later.
 * It may work with older versions, but it is not guaranteed.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * */

var paramdeck = PluginManager.parameters('FSDK_FullScreenPlus');
FirehawkADK.ParamDeck.DefaultFullScreen = paramdeck['defaultFullscreen'] === 'true';
let isHandheld = false;

FirehawkADK.FullscreenPlus.isHandheld = function () {
    return isHandheld;
}

FirehawkADK.FullscreenPlus.CheckHandheldFlag = function () {
    if (Utils.isNwjs()) {
        for (arg in nw.App.argv) {
            if (nw.App.argv[arg] === '--handheld') {
                Graphics._requestFullScreen();
                isHandheld = true;
            }
        }
    }
}

FirehawkADK.ExtraOptions.FullscreenPlus.ApplyConfig = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    FirehawkADK.ExtraOptions.FullscreenPlus.ApplyConfig.call(this, config);
    this.FullScreenMode = (config['FullScreenMode'] != undefined) ? config['FullScreenMode'] : isHandheld || ConfigManager.FullScreenMode;
        if (ConfigManager.FullScreenMode && !Graphics._isFullScreen()) {
        Graphics._requestFullScreen();
    }

};

FirehawkADK.ExtraOptions.FullscreenPlus.PrepConfig = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = FirehawkADK.ExtraOptions.FullscreenPlus.PrepConfig.call(this);
    config.FullScreenMode = this.FullScreenMode;
    return config;
};

FirehawkADK.ExtraOptions.FullscreenPlus.RegisterSetting = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
    FirehawkADK.ExtraOptions.FullscreenPlus.RegisterSetting.call(this);
    if (!isHandheld) this.addCommand("Full Screen", 'FullScreenMode');
};

var _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
Window_Options.prototype.getConfigValue = function (symbol) {
    if (symbol === 'FullScreenMode') {
        return ConfigManager.FullScreenMode;
    } else {
        return _Window_Options_getConfigValue.call(this, symbol);
    }
};

Window_Options.prototype.handleFullScreenConfig = function (symbol, value) {
    if (value) {
        Graphics._requestFullScreen();
    } else {
        if (Graphics._isFullScreen()) Graphics._cancelFullScreen();
    }
    this.setConfigValue(symbol, value);
    this.redrawItem(this.findSymbol('FullScreenMode'));
}

ConfigManager.FullScreenMode = FirehawkADK.ParamDeck.DefaultFullScreen;

if (Utils.RPGMAKER_NAME === 'MV') {
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        FirehawkADK.FullscreenPlus.CheckHandheldFlag();
    }

    var _Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function (symbol, value) {
        if (symbol === 'FullScreenMode') {
            this.handleFullScreenConfig(symbol, value);
            SoundManager.playCursor();
        } else {
            _Window_Options_changeValue.call(this, symbol, value);
        }
    };
}

if (Utils.RPGMAKER_NAME === 'MZ') {
    _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        if (Utils.isNwjs()) {
            FirehawkADK.FullscreenPlus.CheckHandheldFlag();
        }
    };

    var _Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function (symbol, value) {
        if (symbol === 'FullScreenMode') {
            this.handleFullScreenConfig(symbol, value);
            this.playCursorSound();
        } else {
            _Window_Options_changeValue.call(this, symbol, value);
        }
    };
}

/* Plugin License

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
