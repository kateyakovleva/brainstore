import {AfterViewChecked, Directive, ElementRef, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSmartThreeLetterWrap]',
  standalone: true
})
export class SmartThreeLetterWrapDirective implements AfterViewChecked, OnDestroy {
  private observer: MutationObserver;
  private resizeObserver: ResizeObserver;
  private markedWords = new WeakMap<HTMLElement, boolean>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.observer = new MutationObserver(() => this.markWords());
    this.resizeObserver = new ResizeObserver(() => this.checkWordPositions());
  }

  ngAfterViewChecked(): void {
    this.initObservers();
    this.markWords();
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
    this.resizeObserver.disconnect();
  }

  private initObservers(): void {
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
      characterData: true
    });

    this.resizeObserver.observe(this.el.nativeElement);
  }

  private markWords(): void {
    const textNodes = this.getTextNodes(this.el.nativeElement);

    textNodes.forEach(node => {
      const regex = /(\s*)(\b[\p{L}]{3}\b)(\s*)/giu;
      const newContent = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      // @ts-ignore
      while ((match = regex.exec(node.nodeValue)) !== null) {
        // Добавляем текст до совпадения

        newContent.appendChild(document.createTextNode(
          // @ts-ignore
          node.nodeValue.slice(lastIndex, match.index)
        ));

        // Создаем обертку для слова
        const wrapper = this.renderer.createElement('span');
        wrapper.className = 'three-letter-word';
        wrapper.textContent = match[2];

        // Сохраняем пробелы
        const leadingSpace = match[1];
        const trailingSpace = match[3];

        if (leadingSpace) {
          newContent.appendChild(document.createTextNode(leadingSpace));
        }

        newContent.appendChild(wrapper);

        if (trailingSpace) {
          newContent.appendChild(document.createTextNode(trailingSpace));
        }

        lastIndex = regex.lastIndex;
      }

      // Добавляем оставшийся текст

      newContent.appendChild(document.createTextNode(
        // @ts-ignore
        node.nodeValue.slice(lastIndex)
      ));
      // @ts-ignore
      node.parentNode.replaceChild(newContent, node);
    });

    requestAnimationFrame(() => this.checkWordPositions());
  }

  private checkWordPositions(): void {
    const container = this.el.nativeElement;
    const words = container.querySelectorAll('.three-letter-word');
    const containerRect = container.getBoundingClientRect();

    words.forEach((word: HTMLElement) => {
      if (this.markedWords.has(word)) return;

      const wordRect = word.getBoundingClientRect();
      const isAtEnd = wordRect.right >= containerRect.right - 1;
      const isLastLine = this.isLastLine(word);

      if (isAtEnd && !isLastLine) {
        this.renderer.setStyle(word, 'display', 'inline-block');
        this.renderer.setStyle(word, 'margin-left', '100%');
      }

      this.markedWords.set(word, true);
    });
  }

  private isLastLine(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const containerBottom = this.el.nativeElement.getBoundingClientRect().bottom;
    return rect.bottom >= containerBottom - 1;
  }

  private getTextNodes(node: Node): Node[] {
    const textNodes: Node[] = [];

    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null
    );

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    return textNodes;
  }
}
