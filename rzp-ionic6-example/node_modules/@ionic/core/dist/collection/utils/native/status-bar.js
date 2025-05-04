/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { win } from '../window';
export var Style;
(function (Style) {
  Style["Dark"] = "DARK";
  Style["Light"] = "LIGHT";
  Style["Default"] = "DEFAULT";
})(Style || (Style = {}));
export const StatusBar = {
  getEngine() {
    var _a, _b, _c;
    return ((_b = (_a = win) === null || _a === void 0 ? void 0 : _a.Capacitor) === null || _b === void 0 ? void 0 : _b.isPluginAvailable('StatusBar')) && ((_c = win) === null || _c === void 0 ? void 0 : _c.Capacitor.Plugins.StatusBar);
  },
  supportsDefaultStatusBarStyle() {
    var _a, _b;
    /**
     * The 'DEFAULT' status bar style was added
     * to the @capacitor/status-bar plugin in Capacitor 3.
     * PluginHeaders is only supported in Capacitor 3+,
     * so we can use this to detect Capacitor 3.
     */
    return !!((_b = (_a = win) === null || _a === void 0 ? void 0 : _a.Capacitor) === null || _b === void 0 ? void 0 : _b.PluginHeaders);
  },
  setStyle(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    engine.setStyle(options);
  },
};
