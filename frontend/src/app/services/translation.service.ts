import { Injectable, signal, computed } from '@angular/core';
import { LanguageService } from './language.service';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = signal<{ [lang: string]: Translations }>({});

  currentTranslations = computed(() => {
    const lang = this.languageService.currentLanguage();
    return this.translations()[lang.code] || {};
  });

  constructor(private languageService: LanguageService) {}

  loadTranslations(translations: { [lang: string]: Translations }): void {
    this.translations.set(translations);
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const keys = key.split('.');
    let value: any = this.currentTranslations();

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters like {{param}}
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] || '');
    }

    return value;
  }

}
