import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {stringBase64toBlob} from "../../modules/system/funcions/texto.utils";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
// @ts-ignore
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

// templateUrl: './ViewerComponent.html',
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './ViewerComponent.html',
  styles: [`
    .pdfViewer {
      height: 100%;
    }
  `]
})
export class ViewerComponent implements AfterViewInit, OnInit {
  @Input() base64Image: string = '';
  // @ts-ignore
  url: string = '';
  // @ts-ignore
  urlSafe: SafeResourceUrl;
  constructor(private renderer: Renderer2, private el: ElementRef, public sanitizer: DomSanitizer) {
  }

  generarPDF() {
    const imagen = stringBase64toBlob(this.base64Image, 'application/pdf')
    const url = URL.createObjectURL(imagen);
    this.url = url;

  }

  ngAfterViewInit(): void {
    this.generarPDF();
  }

  ngOnInit(): void {

  }

}
