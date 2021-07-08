import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "noComma"
})
export class NoCommaPipe implements PipeTransform {
  transform(val: string): string {
    if (val !== undefined && val !== null) {
      return val.replace(/,/g, "");
    } else {
      return "";
    }
  }
}
