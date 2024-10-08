import { Client } from "../types";
import { transactions } from "./transactions";

// Simulate clients
export const clients: Client[] = [
    { id: 1, name: "Juan Pérez", city: "Bogotá", balance: 5000000, transactions: [], isLocked: false },
    { id: 2, name: "María Gómez", city: "Medellín", balance: 1000000, transactions: [], isLocked: false },
    { id: 3, name: "Carlos Ramírez", city: "Cali", balance: 1500000, transactions: [], isLocked: false },
    { id: 4, name: "Luis Hernández", city: "Cartagena", balance: 3000000, transactions: [], isLocked: false },
    { id: 5, name: "Ana Torres", city: "Medellín", balance: 4500000, transactions: [], isLocked: false },
    { id: 6, name: "Miguel Sánchez", city: "Bogotá", balance: 1200000, transactions: [], isLocked: false },
    { id: 7, name: "Laura Rojas", city: "Cali", balance: 600000, transactions: [], isLocked: true },
    { id: 8, name: "Pedro Fernández", city: "Cartagena", balance: 800000, transactions: [], isLocked: false },
    { id: 9, name: "Daniela Martínez", city: "Bogotá", balance: 2000000, transactions: [], isLocked: false },
    { id: 10, name: "Sofía Morales", city: "Barranquilla", balance: 1000000, transactions: [], isLocked: true },
    { id: 11, name: "Camilo Pérez", city: "Bucaramanga", balance: 3500000, transactions: [], isLocked: false },
    { id: 12, name: "Sara Delgado", city: "Cali", balance: 700000, transactions: [], isLocked: false },
    { id: 13, name: "José Ruiz", city: "Medellín", balance: 1500000, transactions: [], isLocked: false },
    { id: 14, name: "Claudia Vega", city: "Bogotá", balance: 2500000, transactions: [], isLocked: false },
    { id: 15, name: "Andrés López", city: "Cartagena", balance: 3000000, transactions: [], isLocked: false },
    { id: 16, name: "Natalia Vargas", city: "Cali", balance: 1800000, transactions: [], isLocked: false },
    { id: 17, name: "Felipe Mendoza", city: "Medellín", balance: 2100000, transactions: [], isLocked: false },
    { id: 18, name: "Adriana Castro", city: "Bogotá", balance: 3200000, transactions: [], isLocked: true },
    { id: 19, name: "Juliana Correa", city: "Cartagena", balance: 2800000, transactions: [], isLocked: false },
    { id: 20, name: "Ricardo Gómez", city: "Cali", balance: 4000000, transactions: [], isLocked: false },
    { id: 21, name: "Paula Rincón", city: "Barranquilla", balance: 1000000, transactions: [], isLocked: false },
    { id: 22, name: "Santiago Medina", city: "Bucaramanga", balance: 3500000, transactions: [], isLocked: false },
    { id: 23, name: "Manuela Cárdenas", city: "Bogotá", balance: 1300000, transactions: [], isLocked: false },
    { id: 24, name: "Jorge Zapata", city: "Medellín", balance: 1800000, transactions: [], isLocked: false },
    { id: 25, name: "Lucía Pérez", city: "Cartagena", balance: 2200000, transactions: [], isLocked: true },
    { id: 26, name: "David Vargas", city: "Cali", balance: 1200000, transactions: [], isLocked: false },
    { id: 27, name: "Andrea Suárez", city: "Bogotá", balance: 1900000, transactions: [], isLocked: false },
    { id: 28, name: "Mario Ramírez", city: "Barranquilla", balance: 1500000, transactions: [], isLocked: false },
    { id: 29, name: "Verónica Delgado", city: "Medellín", balance: 3500000, transactions: [], isLocked: false },
    { id: 30, name: "Sebastián Morales", city: "Cali", balance: 2200000, transactions: [], isLocked: false },
    { id: 31, name: "Marcela Reyes", city: "Bogotá", balance: 2400000, transactions: [], isLocked: true },
    { id: 32, name: "José Torres", city: "Cartagena", balance: 1700000, transactions: [], isLocked: false },
    { id: 33, name: "Carolina Díaz", city: "Medellín", balance: 3000000, transactions: [], isLocked: false },
    { id: 34, name: "Alejandro González", city: "Cali", balance: 4000000, transactions: [], isLocked: false },
    { id: 35, name: "Patricia Orozco", city: "Bogotá", balance: 3500000, transactions: [], isLocked: false },
    { id: 36, name: "Raúl Gómez", city: "Barranquilla", balance: 1200000, transactions: [], isLocked: false },
    { id: 37, name: "Fernanda Méndez", city: "Bucaramanga", balance: 2000000, transactions: [], isLocked: true },
    { id: 38, name: "César Ruiz", city: "Cali", balance: 2500000, transactions: [], isLocked: false },
    { id: 39, name: "Lorena García", city: "Medellín", balance: 1800000, transactions: [], isLocked: false },
    { id: 40, name: "Ignacio Torres", city: "Bogotá", balance: 2900000, transactions: [], isLocked: false },
    { id: 41, name: "Alejandra Sandoval", city: "Cartagena", balance: 2400000, transactions: [], isLocked: false },
    { id: 42, name: "Felipe Ramírez", city: "Cali", balance: 3200000, transactions: [], isLocked: false },
    { id: 43, name: "Mariana López", city: "Medellín", balance: 1600000, transactions: [], isLocked: false },
    { id: 44, name: "Luis Rodríguez", city: "Bogotá", balance: 1000000, transactions: [], isLocked: false },
    { id: 45, name: "Rosa Pineda", city: "Bucaramanga", balance: 2100000, transactions: [], isLocked: false },
    { id: 46, name: "Gustavo Gil", city: "Barranquilla", balance: 3500000, transactions: [], isLocked: true },
    { id: 47, name: "Sandra Castaño", city: "Cali", balance: 1500000, transactions: [], isLocked: false },
    { id: 48, name: "Javier López", city: "Medellín", balance: 2300000, transactions: [], isLocked: false },
    { id: 49, name: "Camila Ortiz", city: "Bogotá", balance: 1000000, transactions: [], isLocked: false },
    { id: 50, name: "Esteban Vega", city: "Cartagena", balance: 2700000, transactions: [], isLocked: false },
    { id: 51, name: "Daniela Fuentes", city: "Cali", balance: 3000000, transactions: [], isLocked: false },
    { id: 52, name: "Juan Ruiz", city: "Bogotá", balance: 1800000, transactions: [], isLocked: false },
    { id: 53, name: "Luisa Camacho", city: "Medellín", balance: 2600000, transactions: [], isLocked: false },
    { id: 54, name: "Gabriel Moreno", city: "Cali", balance: 3400000, transactions: [], isLocked: false },
    { id: 55, name: "Natalia Rivas", city: "Cartagena", balance: 1900000, transactions: [], isLocked: false },
    { id: 56, name: "Miguel Salazar", city: "Barranquilla", balance: 1500000, transactions: [], isLocked: true },
    { id: 57, name: "Daniel Vargas", city: "Bogotá", balance: 1700000, transactions: [], isLocked: false },
    { id: 58, name: "Angela López", city: "Bucaramanga", balance: 2000000, transactions: [], isLocked: false },
    { id: 59, name: "Paola Martínez", city: "Medellín", balance: 2200000, transactions: [], isLocked: false },
    { id: 60, name: "Julián Ramírez", city: "Cali", balance: 1400000, transactions: [], isLocked: false }
];

// Include transactions array into clientsData
 const clientsData: any = clients.forEach(client => {
    client.transactions = transactions.filter(transaction => transaction.clientId === client.id)
})

