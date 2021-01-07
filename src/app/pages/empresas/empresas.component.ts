import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/empresas.service';
import { ButtonRenderComponent } from './button.render.component';
import { EmpresasTotal } from '../../interfaces/interfaceEmpresas';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
   settings = {
      columns: {
         nameAgency: {
            title: 'Nombre empresa',
            filter: false,
            sortDirection: 'asc'
         },
         finalPrice: {
            title: 'Total de ventas',
            filter: false,
         },
         Comision: {
            type: 'html',
            title: 'Comisión',
            filter: false,
            editable: false,
            valuePrepareFunction: (cell: any, row: any) => {
               if (row.finalPrice !== '') {
                  return `<p class="font-weight-normal">${row.finalPrice*0.025}</p>`;
               } else {
                  return '';
               }
            }
         },
         Detalle: {
            type: 'custom',
            title: 'Acción',
            filter: false,
            renderComponent: ButtonRenderComponent,
            valuePrepareFunction: (cell: any, row: any) => row.nameAgency,
         }
      },
      hideSubHeader: true,
      actions: {
         add: false,
         edit: false,
         delete: false
      },
      pager: {
         perPage: 8
      },
      attr: {
         class: 'table table-bordered table-light'
      }
   };
   data: EmpresasTotal[] = [];
   cantidadMasVentas = 0;
   empresaMasVentas = '';
   mesMayorVentas = '';
   totalRegistros = 0;

   loading = false;

   constructor(private empresaService: EmpresasService) { }

   async ngOnInit(): Promise<void> {
      this.loading = true;

      const empresas = await this.empresaService.getTotalVentasEmpresas();
      this.data = empresas;
      this.totalRegistros = this.data.length;

      this.loading = false;

      const empresaMasVentas = empresas.reduce((acc, val) => acc.finalPrice > val.finalPrice ? acc : val);
      this.cantidadMasVentas = empresaMasVentas.finalPrice;
      this.empresaMasVentas = empresaMasVentas.nameAgency;

      this.mesMayorVentas = await this.empresaService.getMayorVentasMes();

   }
}
