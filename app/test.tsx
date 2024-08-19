'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
// Definición de tipos para los datos

interface Client {
  id: number;
  name: string;
  city: string;
  balance: number;
  movimientos: Transaction[];
  isLocked: boolean; // Nueva propiedad para manejar concurrencia

}

interface Transaction {
  clientId: number;
  type: "withdraw" | "deposit";
  value: number;
  city: string;
  date: string; // Usar formato de string para fechas
}

// Simulación de datos de clientes
const clientes: Client[] = [
  { id: 1, name: "Juan Pérez", city: "Bogotá", balance: 5000000, movimientos: [], isLocked: false },
  { id: 2, name: "María Gómez", city: "Medellín", balance: 1000000, movimientos: [], isLocked: false },
  { id: 3, name: "Carlos Ramírez", city: "Cali", balance: 1500000, movimientos: [], isLocked: false },
];

// Simulación de movimientos
const movimientos: Transaction[] = [
  { clientId: 1, type: "withdraw", value: 1200000, city: "Cartagena", date: "2024-07-05" },
  { clientId: 1, type: "deposit", value: 500000, city: "Bogotá", date: "2024-07-10" },
  { clientId: 2, type: "withdraw", value: 100000, city: "Bogotá", date: "2024-07-08" },
  { clientId: 2, type: "withdraw", value: 900000, city: "Medellín", date: "2024-07-12" },
  { clientId: 3, type: "withdraw", value: 2000000, city: "Cartagena", date: "2024-07-15" },
  { clientId: 3, type: "withdraw", value: 500000, city: "Bogotá", date: "2024-07-20" },
];

export default function Home() {
  const [clientsData, setClientesData] = useState<Client[]>(clientes);
  const [selectedClient, setSelectedCliente] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null); // Manejamos errores

  // Función para consultar balance
  const checkBalance = (clientId: number) => {
    const client = clientsData.find((client) => client.id === clientId);
    setSelectedCliente(client || null);
  };
  // Función para manejar las transacciones
  const manejarTransaccion = (clientId: number, value: number, type: "deposit" | "withdraw") => {
    setClientesData((prevState) => {
      return prevState.map((client) => {
        if (client.id === clientId) {
          if (client.isLocked) {
            setError("La cuenta está bloqueada, inténtelo de nuevo.");
            return client;
          }

          /*           client.isLocked = true; // Bloquear la cuenta para evitar concurrencia
           */
          if (type === "withdraw" && client.balance < value) {
            setError("Saldo insuficiente para realizar el withdraw.");
            client.isLocked = false;
            return client;
          }

          // Realizar la transacción
          const nuevoSaldo = type === "deposit" ? client.balance + value : client.balance - value;

          // Actualizar el balance y desbloquear la cuenta
          client = { ...client, balance: nuevoSaldo, isLocked: true };
          setError(null);

          // Simular un movimiento
          const nuevoMovimiento: Transaction = {
            clientId: client.id,
            type,
            value,
            city: client.city,
            date: new Date().toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
          };
          movimientos.push(nuevoMovimiento);

          return client;
        }
        return client;
      });
    });
  };
  // Función para realizar un depósito
  const depositMoney = (clientId: number, value: number) => {
    manejarTransaccion(clientId, value, "deposit");
  };

  // Función para retirar dinero
  const withdrawMoney = (clientId: number, value: number) => {
    manejarTransaccion(clientId, value, "withdraw");
  };

  // Función para obtener movimientos recientes
  const obtenerMovimientos = (clientId: number): Transaction[] => {
    return movimientos.filter((mov) => mov.clientId === clientId);
  };

  // Función para generar reporte de transacciones por client
  const generarReporteTransaccionesMes = (mes: number, year: number): Client[] => {
    const transaccionesMes = movimientos.filter(
      (mov) => new Date(mov.date).getMonth() + 1 === mes && new Date(mov.date).getFullYear() === year
    );
    const clientesTransacciones = clientsData.map((client) => {
      const numTransacciones = transaccionesMes.filter((mov) => mov.clientId === client.id).length;
      return { ...client, movimientos: [], numTransacciones };
    });
    return clientesTransacciones.sort((a, b) => (b as any).numTransacciones - (a as any).numTransacciones);
  };

  const generarReporteRetiros = () => {
    return movimientos
      .filter((mov) => {
        const client = clientes.find((client) => client.id === mov.clientId);
        if (client) {
          console.log(`Client: ${client.name}, Ciudad Origen: ${client.city}, Ciudad Retiro: ${mov.city}`);
        }
        return (
          mov.type === "withdraw" &&
          mov.value > 1000000 &&
          client &&
          mov.city.trim().toLowerCase() !== client.city.trim().toLowerCase() // Comparación robusta
        );
      })
      .map((mov) => {
        const client = clientes.find((client) => client.id === mov.clientId);
        return { ...mov, name: client?.name, totalRetirado: mov.value };
      });
  };
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="pb-5">Bluesoft Bank</h1>
<>
      {/* Lista de clientes */}
      <h2 className="p-5">Clientes</h2>
      <div className="clients-grid">
        {error && <p className="error">{error}</p>}

        <ul>
          {clientsData.map((client) => (
            <li key={client.id}>
              {client.name} - {client.city}
              <button onClick={() => checkBalance(client.id)}>Consultar Saldo</button>
              <button onClick={() => depositMoney(client.id, 100000)}>Depositar $100,000</button>
              <button onClick={() => withdrawMoney(client.id, 500000)}>Retirar $500,000</button>
            </li>
          ))}
        </ul>

      </div>

      {/* Mostrar balance y movimientos del client */}
      {selectedClient && (
        <div>
          <h2>Saldo de {selectedClient.name}</h2>
          <p>Saldo: ${selectedClient.balance.toLocaleString()}</p>
          <h3>Movimientos recientes:</h3>
          <ul>
            {obtenerMovimientos(selectedClient.id).map((mov, index) => (
              <li key={index}>
                {mov.type === "withdraw" ? "Retiro" : "Depósito"} de ${mov.value.toLocaleString()} en {mov.city} el {mov.date}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Generar reportes */}
      <h2>Reportes</h2>
      <h3>Listado de clientes con transacciones en Julio 2024</h3>
      <ul>
        {generarReporteTransaccionesMes(7, 2024).map((client, index) => (
          <li key={index}>
            {client.name} - {(client as any).numTransacciones} transacciones
          </li>
        ))}
      </ul>
      <h3>Clientes con retiros fuera de la city por más de $1,000,000</h3>
      <ul>
        {generarReporteRetiros().map((mov, index) => (
          <li key={index}>
            {mov.name} retiró ${mov.totalRetirado.toLocaleString()} en {mov.city} el {mov.date}
          </li>
        ))}
      </ul>

</>
    </main>
  );
}
