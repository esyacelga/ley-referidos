import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FileUploadModule} from "primeng/fileupload";
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from "primeng/toast";
import {DataViewModule} from 'primeng/dataview';
import {FieldsetModule} from "primeng/fieldset";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";


@NgModule({
  declarations: [],
  imports: [
    SplitButtonModule,
    ToolbarModule,
    FieldsetModule,
    TagModule,
    DataViewModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    FileUploadModule,
    MatInputModule,
    MatFormFieldModule,
    CalendarModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    TableModule,
    CommonModule
  ],
  exports: [
    SplitButtonModule,
    ToolbarModule,
    FieldsetModule,
    TagModule,
    DataViewModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    FileUploadModule,
    MatInputModule,
    MatFormFieldModule,
    CalendarModule,
    ButtonModule,
    TabViewModule,
    SharedModule,
    TableModule,
    CommonModule
  ]

})
export class NgprimeModule {
}
