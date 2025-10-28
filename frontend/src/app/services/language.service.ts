import { Injectable, signal, effect, untracked } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected_language';

  readonly availableLanguages: Language[] = [
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  currentLanguage = signal<Language>(this.getInitialLanguage());

  constructor() {
    // Save language to localStorage whenever it changes
    effect(() => {
      const lang = this.currentLanguage();
      untracked(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(this.STORAGE_KEY, lang.code);
        }
      });
    });
  }

  private getInitialLanguage(): Language {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      const savedLangCode = localStorage.getItem(this.STORAGE_KEY);
      if (savedLangCode) {
        const savedLang = this.availableLanguages.find(l => l.code === savedLangCode);
        if (savedLang) {
          return savedLang;
        }
      }

      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      const matchingLang = this.availableLanguages.find(l => l.code === browserLang);
      if (matchingLang) {
        return matchingLang;
      }
    }

    // Default to Hungarian
    return this.availableLanguages[0];
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
  }

  getLanguageByCode(code: string): Language | undefined {
    return this.availableLanguages.find(l => l.code === code);
  }
}
