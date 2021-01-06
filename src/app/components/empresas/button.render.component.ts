import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  template: `
    <button (click)="verDetalles()"
            type="button"
            class="btn btn-secondary btn-sm">Ver detalle</button>
  `,
})
export class ButtonRenderComponent implements OnInit {
   @Input() value: any;
   constructor(private router: Router) {  }

   ngOnInit() {
   }

   verDetalles() {
      this.router.navigate(['/empresas', this.value]);
   }
}