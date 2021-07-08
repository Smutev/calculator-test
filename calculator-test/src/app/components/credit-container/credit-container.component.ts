import { Component, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment";
import { PercentCounterService } from "../../services/percent-counter.service";
import { Subscription } from "rxjs";
import { FormInterface } from "../../shared/form.interface";

const RANDOM_PERCENT = 0.13;
const DAYS_IN_YEAR = 365;
const DAYS_IN_WEEK = 7;
@Component({
  selector: "app-credit-container",
  templateUrl: "./credit-container.component.html",
  styleUrls: ["./credit-container.component.scss"]
})
export class CreditContainerComponent implements OnInit, OnDestroy {
  public readonly dateFormat: string = "EEEEEE, dd.MM.yyyy";
  public sub$: Subscription;
  public returnDate: moment.Moment = moment();
  public creditSum: number = 0;
  public percentToPay: number = 0;
  constructor(private percentCounterService: PercentCounterService) {}

  public ngOnInit(): void {
    this.sub$ = this.percentCounterService.sub$.subscribe(
      (res: FormInterface) => {
        this.returnDate = moment().add(res.term.value, res.term.type);
        this.creditSum = res.sum;
        this.percentToPay = this.calculatePercent(res.term);
      }
    );
  }

  public calculatePercent(term: { type: string; value: number }): number {
    const { type } = term;
    let { value } = term;

    if (type === "week") {
      value *= DAYS_IN_WEEK;
    }
    return ((this.creditSum * RANDOM_PERCENT) / DAYS_IN_YEAR) * value;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
