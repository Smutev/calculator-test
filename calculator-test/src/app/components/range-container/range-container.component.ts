import { Component, OnInit } from "@angular/core";
import { RangeValuesNamesInterface } from "../../shared/range-values-names.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PercentCounterService } from "../../services/percent-counter.service";
import { FormInterface } from "../../shared/form.interface";

@Component({
  selector: "app-range-container",
  templateUrl: "./range-container.component.html",
  styleUrls: ["./range-container.component.scss"]
})
export class RangeContainerComponent implements OnInit {
  public readonly titleForDateRange: string = "Срок";
  public readonly entityStartNameForDateRange: string = "дней";
  public readonly entityEndNameForDateRange: string = "недель";
  public dateRangeValues: RangeValuesNamesInterface = {
    firstValue: "1 день",
    secondValue: "31 день",
    thirdValue: "8 недель",
    fourthValue: "18 недель"
  };
  public sumRangeValues: RangeValuesNamesInterface = {
    firstValue: 50,
    secondValue: 14999,
    thirdValue: 15000,
    fourthValue: 30000
  };

  public form: FormGroup;
  public minSum = 50;
  public maxSum = 30000;
  public minTerm = 1;
  public maxTerm = 31;

  public isButtonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private percentCounterService: PercentCounterService
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.form.valueChanges.subscribe((res: FormInterface) => {
      this.percentCounterService.sub$.next(res),
        (this.isButtonDisabled = this.form.valid);
    });
  }

  public createForm() {
    this.form = this.fb.group({
      sum: [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(this.minSum),
          Validators.max(this.maxSum)
        ])
      ],
      term: [
        { type: "days", value: 0 },
        Validators.compose([
          Validators.required,
          Validators.min(this.minTerm),
          Validators.max(this.maxTerm)
        ])
      ]
    });
  }

  public submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    alert("Кредит успешно оформлен");
  }
}
