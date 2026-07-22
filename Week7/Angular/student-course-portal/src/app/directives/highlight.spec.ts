import { HighlightDirective } from './highlight';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new HighlightDirective(elMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
