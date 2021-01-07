import { Injectable } from '@angular/core';
import { DetalleEmpresa, Empresas, EmpresasTotal, EmpresasTotalPorMes, TotalPorMes } from '../interfaces/interfaceEmpresas';
import { AngularFirestore } from '@angular/fire/firestore';


const monthNames = [
   'Enero', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

   constructor(private firestore: AngularFirestore) { }

   async getEmpresas(): Promise<Empresas[]> {
      return new Promise<any>(resolve => {
         this.firestore.collection('heyAndes').valueChanges().subscribe((resp: any) => {
            if (resp[0].empresas.length > 0) {
               resolve(resp[0].empresas);
            }
         });
      });
   }

   async getTotalVentasPorMes(): Promise<EmpresasTotalPorMes[]> {
      const totalEmpresas = await this.getEmpresas();

      const totalVentasPorMes: EmpresasTotalPorMes[] = [];

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

      const totalVentasEmpresas: EmpresasTotal[] = [];

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

      const ventasPorMes: TotalPorMes[] = [];

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

   async getVentasPorEmpresa(nombreEmpresa: string): Promise<DetalleEmpresa[]> {
      const empresas = await this.getEmpresas();
      const listadoVentas = empresas
         .filter(emp => emp.nameAgency === nombreEmpresa)
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
