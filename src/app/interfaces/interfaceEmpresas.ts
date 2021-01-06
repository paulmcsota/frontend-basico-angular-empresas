export interface Empresas {
   createdAt: string;
   datePayment: string;
   day?: string;
   dayFrom?: string;
   dayTo?: string;
   finalPrice: number;
   hour: string;
   nameAgency: string;
   name: string;
   paymentStatus: string;
   paymentType?: string;
   persons: number;
   status?: string;
   timeZone: string;
   totalPrice?: number;
   wayToPay?: string;
}

export interface EmpresasTotal {
   nameAgency: string;
   finalPrice: number;
}

export interface EmpresasTotalPorMes {
   nameAgency: string;
   finalPrice: number;
   month: string;
}

export interface TotalPorMes {
   month: string;
   finalPrice: number;
}

export interface DetalleEmpresa {
   name: string;
   persons: number;
   day?: string;
   hour: string;
   finalPrice: number;
}