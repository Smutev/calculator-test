import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promocode-button",
  templateUrl: "./promocode-button.component.html",
  styleUrls: ["./promocode-button.component.scss"]
})
export class PromocodeButtonComponent implements OnInit {
  constructor() {}
  public ngOnInit(): void {}

  public alert(): void {
    alert("Типо поп-ап для промокода");
  }
}
