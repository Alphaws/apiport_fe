import {ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {LanguageService, Language} from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  imports: [
    NgForOf
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  isOpen = false;

  constructor(
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  get currentLanguage() {
    return this.languageService.currentLanguage();
  }

  get languages() {
    return this.languageService.availableLanguages;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(language: Language) {
    this.languageService.setLanguage(language);
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
