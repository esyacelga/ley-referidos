import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-title',
  templateUrl: './dialog-title.component.html',
  styleUrls: ['./dialog-title.component.css']
})
export class DialogTitleComponent implements OnInit {

  @Input('titulo') titulo: string = 'siisspolweb.label.comun.informacion'

  constructor() {
  }

  ngOnInit(): void {
  }

}
