import { Component, OnInit } from "@angular/core";
import { RangeValuesNamesInterface } from "../../shared/range-values-names.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
  public minSum: number = 50;
  public maxSum: number = 30000;
  public minTerm: number = 1;
  public maxTerm: number = 31;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      sum: [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(this.minSum),
          Validators.min(this.maxSum)
        ])
      ],
      term: [
        {type: 'day', value: 0},
        Validators.compose([
          Validators.required,
          Validators.min(this.minTerm),
          Validators.min(this.maxTerm)
        ])
      ]
    });
  }

  log() {
    console.log(this.form.value);
  }
}
