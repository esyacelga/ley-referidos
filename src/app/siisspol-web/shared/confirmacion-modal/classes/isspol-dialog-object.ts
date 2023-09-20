import {MatDialogConfig} from "@angular/material/dialog";

export class IsspolDialogObject extends MatDialogConfig {
  constructor(data: any) {
    super();
    this.data = data;
    this.disableClose = true;
    this.autoFocus = true;
    this.width='600px'
    this.position = {top: '50px'}
  }
}
