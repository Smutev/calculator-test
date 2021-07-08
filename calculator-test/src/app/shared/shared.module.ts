import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DraggableDirective } from "../directives/draggable.directive";
import { NoCommaPipe } from "../pipes/no-comma.pipe";

@NgModule({
  declarations: [DraggableDirective, NoCommaPipe],
  imports: [CommonModule],
  exports: [DraggableDirective, NoCommaPipe]
})
export class SharedModule {}
