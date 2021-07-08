import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import { DragElementOutputInterface } from "../../../shared/drag-element-output.interface";
import { RangeValuesNamesInterface } from "../../../shared/range-values-names.interface";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const DAYS_IN_FIRST_PART = 31;
const WEEKS_IN_SECOND_PART = 10;
const DAYS_TO_MINUS = 2;
const ELEMENT_PX_OFFSET = 16;

@Component({
  selector: "app-range-selector",
  templateUrl: "./range-selector.component.html",
  styleUrls: ["./range-selector.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RangeSelectorComponent)
    }
  ]
})
export class RangeSelectorComponent implements OnInit, ControlValueAccessor {
  public rangeValue: number = 0;
  public onChange: (value: number | { type: string; value: number }) => void;

  public maxWidth: number = 0;
  public currentPosition: number = 0;

  public entityName: string = "";
  private firstLoad: boolean = true;
  private timeType: string = "days";

  @Input() public min: number = 50;
  @Input() public max: number = 30000;
  @Input() public entityTitle: string = "Сумма";
  @Input() public entityStartName: string = "грн";
  @Input() public changedEntityName: string = "";
  @Input() public entityValuesNames: RangeValuesNamesInterface;
  @Input() public inputWidth: number;
  @Input() public isDivided: boolean = true;
  @Input() public isTypeNeeded: boolean = false;

  @ViewChild("firstPart", { static: false }) public firstRangePart: ElementRef;
  @ViewChild("secondPart", { static: false })
  public secondRangePart: ElementRef;
  @ViewChild("thumb", { static: false }) public thumb: ElementRef;

  constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.entityName = this.entityStartName;
  }

  public writeValue(value: number | { type: string; value: number }): void {
    this.rangeValue = typeof value === "number" ? value : value.value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setValue(): void {
    this.onChange(
      this.isTypeNeeded
        ? { type: this.timeType, value: this.rangeValue }
        : this.rangeValue
    );
  }

  public handleRangeChange(e: DragElementOutputInterface) {
    this.maxWidth = e.maxWidth;
    this.currentPosition = e.currentPosition;

    if (this.isDivided) {
      this.currentPosition < this.maxWidth / 2
        ? this.handleLikeFirstPart()
        : this.handleLikeSecondPart();
    } else {
      this.handleFullTrack();
    }

    this.firstLoad ? (this.firstLoad = false) : this.setValue();
  }

  public handleFullTrack(): void {
    const entityPerPx = this.maxWidth / this.max;
    this.rangeValue = Math.round(this.currentPosition / entityPerPx);

    this.currentPosition < this.maxWidth / 2
      ? this.renderFirstGradient()
      : this.renderSecondGradient();
  }

  public handleLikeFirstPart(): void {
    this.renderFirstGradient();

    if (this.changedEntityName) {
      this.entityName = this.entityStartName;
    }

    const entityPerPx = this.maxWidth / 2 / DAYS_IN_FIRST_PART;
    this.rangeValue = Math.round(this.currentPosition / entityPerPx);
    this.timeType = "days";
  }

  public handleLikeSecondPart(): void {
    this.renderSecondGradient();

    if (this.changedEntityName) {
      this.entityName = this.changedEntityName;
    }

    const entityPerPx = this.maxWidth / 2 / WEEKS_IN_SECOND_PART;
    this.rangeValue = Math.round(
      this.currentPosition / entityPerPx - DAYS_TO_MINUS
    );
    this.timeType = "week";
  }

  public handleInputChange(e: Event): void {
    this.validateInput(+(e.target as HTMLTextAreaElement).value);

    if (this.changedEntityName) {
      this.entityName = this.entityStartName;
    }

    this.setStylesAfterInputChange(
      this.maxWidth / this.max / (this.isDivided ? 2 : 1)
    );

    this.timeType = "days";
    this.setValue();
  }

  public renderFirstGradient(): void {
    this.renderer.setStyle(
      this.firstRangePart.nativeElement,
      "width",
      `${this.currentPosition + ELEMENT_PX_OFFSET}px`
    );
  }

  public renderSecondGradient(): void {
    this.renderer.setStyle(
      this.secondRangePart.nativeElement,
      "width",
      `${this.currentPosition - this.maxWidth / 2}px`
    );
  }

  public setStylesAfterInputChange(entityPerPx): void {
    this.renderer.setStyle(
      this.firstRangePart.nativeElement,
      "width",
      `${entityPerPx * this.rangeValue}px`
    );

    this.renderer.setStyle(this.secondRangePart.nativeElement, "width", "0px");

    this.renderer.setStyle(
      this.thumb.nativeElement,
      "transform",
      `translate(${entityPerPx * this.rangeValue}px, -50%)`
    );
  }

  public validateInput(value): void {
    if (isNaN(value)) {
      this.rangeValue = this.min;
    } else {
      if (value < this.min) {
        this.rangeValue = this.min;
      } else if (value > this.max) {
        this.rangeValue = this.max;
      } else {
        this.rangeValue = value;
      }
    }
  }
}
