export interface Client {
    id: number;
    name: string;
    city: string;
    balance: number;
    transactions: Transaction[];
    isLocked: boolean; // Nueva propiedad para manejar concurrencia

}

export interface Transaction {
    clientId: number;
    type: "withdraw" | "deposit";
    value: number;
    city: string;
    date: string; // Usar formato de string para fechas
}
export interface WithdrawReport {
    name: string;
    date: string;
    withdrawCity: string;
    totalWithdraw: number;
}