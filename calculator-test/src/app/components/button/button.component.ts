import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PercentCounterService } from "../../services/percent-counter.service";
import { FormInterface } from "../../shared/form.interface";

const CURRENCY = "грн";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  public readonly currency: string = CURRENCY;
  public buttonValue: number = 0;
  public buttonTitle: string = "Оформить кредит";

  @Output() public onFormSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private percentCounterService: PercentCounterService) {}
  public ngOnInit(): void {
    this.percentCounterService.sub$.subscribe((res: FormInterface) => {
      this.buttonValue = res.sum;
    });
  }

  public submit(): void {
    this.onFormSubmit.emit();
  }
}
