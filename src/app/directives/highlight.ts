// highlight.ts
import { Directive, ElementRef, HostListener, input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);
  
  highlightColor = input<string>('#f0f0f0');

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor());
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(''); 
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }
}