import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  template: `
    <button (click)="verDetalles()"
            type="button"
            class="btn btn-secondary btn-sm">Ver detalle</button>
  `,
})
export class ButtonRenderComponent {
   @Input() value: any;
   constructor(private router: Router) {  }

   verDetalles(): void {
      this.router.navigate(['/empresas', this.value]);
   }
}