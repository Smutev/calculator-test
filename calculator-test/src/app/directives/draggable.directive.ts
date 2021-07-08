import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import { DragElementOutputInterface } from "../shared/drag-element-output.interface";

@Directive({
  selector: "[appDraggable]"
})
export class DraggableDirective implements OnInit, AfterViewInit, OnDestroy {
  private element: HTMLElement;
  private subscriptions: Subscription[] = [];

  @Input() appDraggable: HTMLElement | HTMLBodyElement;
  @Output() onChangeThumbPosition: EventEmitter<
    DragElementOutputInterface
  > = new EventEmitter<DragElementOutputInterface>();

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (!this.appDraggable) {
      throw new Error("There is no draggable element");
    } else {
      this.element = this.elementRef.nativeElement as HTMLElement;
      this.onChangeThumbPosition.emit({
        maxWidth: this.appDraggable.clientWidth,
        currentPosition: 0
      });
      this.initDrag();
    }
  }

  public initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number;
    let currentX = 0;

    let dragSub: Subscription;

    const minBoundX = 0;

    const maxBoundX =
      minBoundX + this.appDraggable.offsetWidth - this.element.offsetWidth;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      const firstTranslatePropPart = this.element.style.transform.split("(")[1];
      if (firstTranslatePropPart) {
        currentX = parseInt(firstTranslatePropPart.split("px")[0]);
      }

      initialX = event.clientX - currentX;

      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();
        const x = event.clientX - initialX;
        currentX = Math.max(minBoundX, Math.min(x, maxBoundX));

        this.onChangeThumbPosition.emit({
          maxWidth: maxBoundX,
          currentPosition: currentX
        });

        this.element.style.transform = `translate(${currentX}px, -50%)`;
      });
    });

    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub,
      dragEndSub
    ]);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
