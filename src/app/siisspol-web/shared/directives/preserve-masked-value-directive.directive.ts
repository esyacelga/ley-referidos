import { Directive, ElementRef, HostListener  } from '@angular/core';

@Directive({
  selector: '[preserveMaskedValueDirective]'
})
export class PreserveMaskedValueDirectiveDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const originalValue = this.el.nativeElement.value;
    const maskedValue = this.getMaskedValue(originalValue, value);
    this.el.nativeElement.value = maskedValue;
    this.el.nativeElement.dispatchEvent(new Event('input'));
  }

  private getMaskedValue(originalValue: string, newValue: string): string {
    let result = '';

    for (let i = 0; i < originalValue.length; i++) {
      if (originalValue[i] === '-' && newValue[i] !== '-') {
        result += '-';
      } else {
        result += newValue[i];
      }
    }

    return result;
  }

}
