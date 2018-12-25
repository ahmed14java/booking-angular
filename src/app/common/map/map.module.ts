import { MapComponent } from "./map.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { MapService } from './map.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAZuk5tQD9JbdGabNwoBfJ5EOHNQWyFpXg"
    })
  ],
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: [MapService]
})
export class MapModule {}
