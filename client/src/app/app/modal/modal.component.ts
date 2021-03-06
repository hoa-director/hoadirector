import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})

// Upgrading to Angular 8 requires a static flag in @ContentChild and @ViewChild
// Added static flag an set to true
export class ModalComponent implements OnDestroy {
  @ContentChild('modalHeader', {static: true}) header: TemplateRef<any>;
  @ContentChild('modalBody', {static: true}) body: TemplateRef<any>;
  @ContentChild('modalFooter', {static: true}) footer: TemplateRef<any>;
  @Input() closeOnOutsideClick = true;

  visible = false;
  visibleAnimate = false;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnDestroy() {
    // Prevent modal from not executing its closing actions if the user navigated away (for example,
    // through a link).
    this.close();
  }

  open(): void {
    document.body.classList.add('modal-open');

    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
    });
  }

  close(): void {
    document.body.classList.remove('modal-open');

    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.changeDetectorRef.markForCheck();
    }, 200);
  }

  @HostListener('click', ['$event'])
  onContainerClicked(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).classList.contains('modal') &&
      this.isTopMost() &&
      this.closeOnOutsideClick
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent) {
    // If ESC key and TOP MOST modal, close it.
    if (event.key === 'Escape' && this.isTopMost()) {
      this.close();
    }
  }

  /**
   * Returns true if this modal is the top most modal.
   */
  isTopMost(): boolean {
    return !this.elementRef.nativeElement.querySelector(
      ':scope modal > .modal',
    );
  }
}
