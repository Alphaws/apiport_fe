import { Pipe, PipeTransform } from '@angular/core';
import {LanguageService} from '../services/language.service';
import {TranslationService} from '../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private translationService: TranslationService,
    private languageService: LanguageService
  ) {}

  transform(key: string, params?: { [key: string]: string }): string {
    // Read the signal to trigger change detection
    this.languageService.currentLanguage();

    return this.translationService.translate(key, params);
  }

}
