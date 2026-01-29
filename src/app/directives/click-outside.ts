// click-outside.ts
import { Directive, ElementRef, output, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);
  
  clickOutside = output<void>();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}