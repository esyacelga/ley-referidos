import {NgModule} from '@angular/core';
import {ToBooleanPipe} from './to-boolean.pipe';


@NgModule({
  declarations: [
    ToBooleanPipe
  ],
  exports: [
    ToBooleanPipe
  ]
})
export class PipesModule {
}
