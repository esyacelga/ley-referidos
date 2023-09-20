import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') 
  onInput(): void {
    const value: string = this.el.nativeElement.value;
    const transformedValue: string = value.toUpperCase();
    if (transformedValue !== value) {
      this.el.nativeElement.value = transformedValue;

      // Emitir evento de cambio manualmente para asegurar la actualización del ngModel
      const event = new Event('input', { bubbles: true });
      this.el.nativeElement.dispatchEvent(event);
    }
  }

}
