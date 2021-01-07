import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleEmpresa } from '../../interfaces/interfaceEmpresas';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-detail-empresa',
  templateUrl: './detail-empresa.component.html',
  styleUrls: ['./detail-empresa.component.css']
})
export class DetailEmpresaComponent implements OnInit {

   settings = {
      columns: {
         name: {
            title: 'Nombre cliente',
            filter: false,
         },
         persons: {
            title: 'Personas',
            filter: false,
         },
         day: {
            title: 'Día' ,
            filter: false,
            sortDirection: 'desc'
         },
         hour: {
            title: 'Hora',
            filter: false
         },
         finalPrice: {
            title: 'Valor venta',
            filter: false
         }
      },
      hideSubHeader: true,
      actions: {
         add: false,
         edit: false,
         delete: false
      },
      pager: {
         display : true,
         perPage: 8
      },
      attr: {
         class: 'table table-bordered table-light'
      }
   };

   nameAgency = '';
   listadoVentas: DetalleEmpresa[] = [];
   totalRegistros = 0;

   loading = false;

   constructor(private actRoute: ActivatedRoute,
               private empresaService: EmpresasService) {

      this.actRoute.params.subscribe((params: any) => {
         this.nameAgency = String(params.nombre_empresa);

      });
   }

   async ngOnInit(): Promise<void> {
      this.loading = true;

      this.listadoVentas = await this.empresaService.getVentasPorEmpresa(this.nameAgency);
      this.totalRegistros = this.listadoVentas.length;

      this.loading = false;
   }

}
