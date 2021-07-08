import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FormInterface } from "../shared/form.interface";

@Injectable({
  providedIn: "root"
})
export class PercentCounterService {
  public sub$: Subject<FormInterface> = new Subject<FormInterface>();

  constructor() {}
}
