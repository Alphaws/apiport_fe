import { Injectable } from '@angular/core';
import huTranslations from '../../assets/i18n/hu.json';
import enTranslations from '../../assets/i18n/en.json';
import deTranslations from '../../assets/i18n/de.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationLoaderService {
  getTranslations() {
    return {
      hu: huTranslations,
      en: enTranslations,
      de: deTranslations
    };
  }
}
