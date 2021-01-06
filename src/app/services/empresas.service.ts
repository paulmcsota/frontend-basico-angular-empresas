import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleEmpresa, Empresas, EmpresasTotal, EmpresasTotalPorMes, TotalPorMes } from '../interfaces/interfaceEmpresas';


const monthNames = [
   'Enero', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'
];
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

   constructor(private http: HttpClient) { }

   async getEmpresas(): Promise<Empresas[]> {
      return new Promise<Empresas[]>(resolve => {
         this.http.get<Empresas[]>('/assets/data/sales.json').subscribe(resp => {
            if (resp) {
               resolve(resp);
            }
         });
      });
   }


   async getTotalVentasPorMes(): Promise<EmpresasTotalPorMes[]> {
      const totalEmpresas = await this.getEmpresas();

      let totalVentasPorMes: EmpresasTotalPorMes[] = [];

      totalEmpresas.forEach( emp => {

         const month = new Date(emp.datePayment).getMonth();

         const newEmpresa = totalVentasPorMes.find( x => x.nameAgency === emp.nameAgency && x.month === monthNames[month]); 

         if (!newEmpresa) {
            totalVentasPorMes.push({
               nameAgency: emp.nameAgency,
               finalPrice: emp.finalPrice,
               month: monthNames[month]
            });
         } else {
            newEmpresa.finalPrice += emp.finalPrice;
         }

      });
      return totalVentasPorMes;
   }

   async getTotalVentasEmpresas(): Promise<EmpresasTotal[]> {
      const totalEmpresas = await this.getTotalVentasPorMes();

      let totalVentasEmpresas: EmpresasTotal[] = [];

      totalEmpresas.forEach( emp => {

         const newEmpresa = totalVentasEmpresas.find( x => x.nameAgency === emp.nameAgency);

         if (!newEmpresa) {
            totalVentasEmpresas.push({
               nameAgency: emp.nameAgency,
               finalPrice: emp.finalPrice
            });
         } else {
            newEmpresa.finalPrice += emp.finalPrice;
         }

      });
      return totalVentasEmpresas;
   }

   async getMayorVentasMes(): Promise<string> {
      const totalVentasPorMes = await this.getTotalVentasPorMes();

      let ventasPorMes: TotalPorMes[] = [];

      totalVentasPorMes.forEach( emp => {

         const newMonth = ventasPorMes.find( x => x.month === emp.month);

         if (!newMonth) {
            ventasPorMes.push({
               month: emp.month,
               finalPrice: emp.finalPrice
            });
         } else {
            newMonth.finalPrice += emp.finalPrice;
         }

      });
      const { month } = ventasPorMes.reduce((acc, val) => acc.finalPrice > val.finalPrice ? acc : val);

      return month;
   }

   async getVentasPorEmpresa(nombre_empresa: string): Promise<DetalleEmpresa[]> {
      const empresas = await this.getEmpresas();
      const listadoVentas = empresas
         .filter(emp => emp.nameAgency === nombre_empresa)
         .map( emp => ({
               name: emp.name,
               persons: emp.persons,
               day: emp.day,
               hour: emp.hour,
               finalPrice: emp.finalPrice
            }
         ));
      return listadoVentas;
   }

}
