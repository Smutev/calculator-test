import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DraggableDirective } from "../directives/draggable.directive";

@NgModule({
  declarations: [DraggableDirective],
  imports: [CommonModule],
  exports: [DraggableDirective]
})
export class SharedModule {}
