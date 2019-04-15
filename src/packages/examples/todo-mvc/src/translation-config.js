"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var springtype_incubator_i18n_1 = require("@springtype/springtype-incubator-i18n");
var springtype_incubator_core_1 = require("@springtype/springtype-incubator-core");
var date_fns_1 = require("date-fns");
var englishTranslations = tslib_1.__importStar(require("./translation/en.json"));
var germanTranslations = tslib_1.__importStar(require("./translation/de.json"));
var dateFnsLocales = {
    en: require('date-fns/locale/en'),
    de: require('date-fns/locale/de')
};
var localeId = 'de';
exports.dateFormat = function (date, dateFormat) {
    return date_fns_1.format(date, dateFormat, {
        locale: dateFnsLocales[localeId]
    });
};
var AppTranslationConfig = /** @class */ (function () {
    function AppTranslationConfig(translator) {
        this.translator = translator;
        // this method is called 4 times by the framework internally.
        // this is because of language detection and expected behaviour,
        // but we want to aggregate those calls and listen to only the
        // last one in a time-frame of 10ms. Thus, we buffer the event listener:
        var onLanguageChange = springtype_incubator_core_1.buffer(function (language) {
            // keep translations in sync: when language changes, tell date-fns to change accordingly
            localeId = language;
        }, 10 /* ms */);
        translator.onLanguageChanged(onLanguageChange);
    }
    AppTranslationConfig = tslib_1.__decorate([
        springtype_incubator_i18n_1.Translations('en', englishTranslations),
        springtype_incubator_i18n_1.Translations('de', germanTranslations),
        springtype_incubator_i18n_1.TranslationFormat('uppercase', function (value) { return (value || '').toUpperCase(); }),
        springtype_incubator_i18n_1.TranslationFormat('DD-MM-YYYY_HH:mm:ss', function (value) { return exports.dateFormat(value, 'dddd, DD-MM-YYYY HH:mm:ss'); }),
        springtype_incubator_core_1.Component,
        tslib_1.__metadata("design:paramtypes", [springtype_incubator_i18n_1.Translator])
    ], AppTranslationConfig);
    return AppTranslationConfig;
}());
exports.AppTranslationConfig = AppTranslationConfig;
//# sourceMappingURL=translation-config.js.map