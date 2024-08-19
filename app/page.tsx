'use client'
import React, { useState, useEffect, useCallback } from "react";
import ListClients from "./components/ListClients";
import { Client } from "./types";
import { Transaction } from "./types";
import { WithdrawReport } from "./types";
// Simulate database data
import { clients } from "./database/clients"
import { transactions as initialTransactions } from "./database/transactions"
import WithdrawChart from "./components/charts/WithdrawChart";
import MonthlyTransactions from "./components/charts/MonthlyTransactions";
import { getMonths } from "./utils";



export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [clientsData, setClientsData] = useState<Client[]>(clients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [withDrawReport, setWithDrawReport] = useState<WithdrawReport[]>([]);
  // extract monthly report
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("2024-07");
  const [showDateInput, setShowDateInput] = useState<boolean>(false);

  // filtered client transactions (monthly) 
  const [filteredDate, setFilteredDate] = useState<any>([]);

  // start region Transactions per month (all users)
  const [showMonthInput, setShowMonthInput] = useState<boolean>(false);
  const [clientsWithTransactions, setClientsWithTransactions] = useState<{ client: Client, transactions: number }[]>([]);

  // show outside withdraws section (chart)
  const [showOutsideWithdraws, setShowOutsideWithdraws] = useState(false)
  // show month input
  const showMonthDateInput = () => {
    setShowMonthInput(!showMonthInput);
  };
  // Enable/disable input date
  const showInputDate = (clientId: number) => {
    const client = clientsData.find((client) => client.id === clientId);
    setSelectedClient(client || null);
    setShowDateInput(true);
  };
  // Check balance user (enable client resume)
  const checkBalance = (clientId: number) => {
    const client = clientsData.find((client) => client.id === clientId);
    setSelectedClient(client || null);
  };

  // Manage selected month
  const manageTransactionsBySelectedMonth = (event: string) => {
    const selectedMonthByUser = event;
    setSelectedMonth(selectedMonthByUser);

    // Filtrar transactions por mes y contar transacciones por client
    const clientsTransactions = clientsData.map((client) => {
      const monthlyTransactions = transactions.filter((mov) => {
        return mov.clientId === client.id && mov.date.startsWith(selectedMonthByUser);
      }).length;

      return { client, transactions: monthlyTransactions };
    });

    // Filtrar clientes con al menos una transacción y ordenar descendentemente
    const filterData = clientsTransactions
      .filter((item) => item.transactions > 0)
      .sort((a, b) => b.transactions - a.transactions);

    setClientsWithTransactions(filterData);
  };
  useEffect(() => {
    manageTransactionsBySelectedMonth(selectedMonth)
  }, [transactions])
  // end region Transactions per month (all users)


  // This function allow us to deposit or withdraw money
  const manageTransaction = (clientId: number, value: number, type: "deposit" | "withdraw") => {
    setClientsData((prevClients) => {
      const clienteIndex = prevClients.findIndex((client) => client.id === clientId);
      if (clienteIndex === -1) return prevClients;

      const client = prevClients[clienteIndex];

      if (client.isLocked) {
        setError("Account locked, try later.");
        return prevClients;
      }

      const newBalance = type === "deposit" ? client.balance + value : client.balance - value;
      if (type === "withdraw" && newBalance < 0) {
        setError("Insuficient balance to make this action.");
        return prevClients;
      }

      // Update client
      const clienteActualizado = { ...client, balance: newBalance, isLocked: false };
      const nuevosClientes = [...prevClients];
      nuevosClientes[clienteIndex] = clienteActualizado;

      // Update all transactions
      const nuevoMovimiento: Transaction = {
        clientId: client.id,
        type,
        value,
        city: client.city,
        date: new Date().toISOString().split("T")[0], // format toYYYY-MM-DD
      };

      setTransactions([...transactions, nuevoMovimiento]);
      setError(null);

      // Update the new current client
      if (selectedClient?.id === clientId) {
        setSelectedClient(clienteActualizado);
      }

      return nuevosClientes;
    });
    checkBalance(clientId)
  };
  // Deposit money
  const depositMoney = (clientId: number, value: number) => {
    manageTransaction(clientId, value, "deposit");
  };

  // Withdraw money
  const withdrawMoney = (clientId: number, value: number) => {
    manageTransaction(clientId, value, "withdraw");
  };
  // Calculate withdraw outside the city
  const updateWithdrawReport = useCallback((clients: Client[], transactions: Transaction[]) => {
    const clientsWithdraw: { [key: number]: { totalWithdraw: number; details: Transaction[] } } = {};

    transactions.forEach((mov) => {
      const client = clients.find((client) => client.id === mov.clientId);
      if (
        mov.type === "withdraw" &&
        client &&
        mov.city.trim().toLowerCase() !== client.city.trim().toLowerCase()
      ) {
        if (clientsWithdraw[client.id]) {
          clientsWithdraw[client.id].totalWithdraw += mov.value;
          clientsWithdraw[client.id].details.push(mov);
        } else {
          clientsWithdraw[client.id] = { totalWithdraw: mov.value, details: [mov] };
        }
      }
    });

    const nuevoReporte = Object.keys(clientsWithdraw)
      .filter((clientId) => clientsWithdraw[parseInt(clientId)].totalWithdraw > 1000000)
      .map((clientId) => {
        const client = clients.find((client) => client.id === parseInt(clientId));
        const details = clientsWithdraw[parseInt(clientId)].details;
        return details.map((detalle) => ({
          name: client?.name || "",
          date: detalle.date,
          withdrawCity: detalle.city,
          totalWithdraw: clientsWithdraw[parseInt(clientId)].totalWithdraw,
        }));
      })
      .flat();

    setWithDrawReport(nuevoReporte);
  }, [clientsData, transactions,]);

  // Manage chart and withdraw report
  const manageGenerateWithdrawReport = () => {
    setShowOutsideWithdraws(!showOutsideWithdraws)
    !showOutsideWithdraws && updateWithdrawReport(clientsData, transactions);
  };

  // Get latest client transactions
  const getLatestTransactions = () => {
    if (selectedClient) {
      const recentMoves = transactions
        .filter((mov) => mov.clientId === selectedClient.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return recentMoves
    }
    return [];
  };

  // Get selected date and filtered data by its value
  const manageSelectedDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fechaSeleccionada = event.target.value;
    const [year, month] = fechaSeleccionada.split("-");

    if (selectedClient) {
      const filteredTransactions = transactions.filter((mov) => {
        const [movYear, movMonth] = mov.date.split("-");
        return mov.clientId === selectedClient.id && movYear === year && movMonth === month;
      });
      setFilteredDate([month, year])
      setFilteredTransactions(filteredTransactions);
    }
  };

  // Mapped data to fit in chart
  const aggregateDataByCity = (data: any[]) => {
    const cityTransactionsMap: { [key: string]: number } = {};

    data.forEach((item) => {
      const city = item.client.city;
      const transactions = item.transactions;

      if (cityTransactionsMap[city]) {
        cityTransactionsMap[city] += transactions;
      } else {
        cityTransactionsMap[city] = transactions;
      }
    });

    // convert to a mapped array
    return Object.keys(cityTransactionsMap).map((city) => ({
      city: city,
      transactions: cityTransactionsMap[city],
    }));
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className='cursor' id="cursor"></div>

      <h1 className="pb-5">Bluesoft Bank</h1>
      <>

        {/* Balance and client transactions */}
        <section className="main-content">

          {/* Client resume */}
          {selectedClient && (
            <div className="client-resume">
              <h2>{selectedClient.name}'s Balance: <b>${selectedClient.balance.toLocaleString()}</b> </h2>
              <h3 className="m-2"> <b>Your latest transactions:</b></h3>
              <div className="latest-transactions">
                <ul>
                  {getLatestTransactions().map((mov, index) => (
                    <li key={index} className={`${mov.type === "withdraw" ? "withdraw" : "deposit"}`}>
                      {mov.type === "withdraw" ? "Withdraw" : "Deposit"} of ${mov.value.toLocaleString()} in {mov.city} on {mov.date}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          )}
          <div className="clients-grid">
            <h2 className="p-2 text-center">Clients</h2>
            {error && <h3 className="error">{error}</h3>}
            <ListClients clientsData={clientsData.sort((a, b) => b.transactions.length - a.transactions.length)} checkBalance={checkBalance}
              depositMoney={depositMoney} withdrawMoney={withdrawMoney}
              showInputDate={showInputDate} showDateInput={showDateInput}
              selectedClient={selectedClient} manageSelectedDate={manageSelectedDate} />
          </div>
          {/* Filter by date list */}
          {filteredTransactions.length > 0 && (
            <div className="filtered-client-transactios">
              <h2>{selectedClient?.name}'s Transactions</h2>
              <h3 className="m-2"><b>From {getMonths(filteredDate[0])} {filteredDate[1]}:</b> </h3>
              <ul>
                {filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((mov, index) => (
                  <li key={index} className={`${mov.type === "withdraw" ? "withdraw" : "deposit"}`}>
                    {mov.type === "withdraw" ? "Withdraw" : "Deposit"} of ${mov.value.toLocaleString()} in {mov.city} on {mov.date}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </section>

        {/* All clients monthly transactions */}
        <button className="mb-2" onClick={showMonthDateInput}>{showMonthInput ? "Hide" : "Show"} monthly transactions (All clients)</button>
        {showMonthInput && (
          <section id="all-clients-monthly-transactions" className="flex flex-col justify-items-center">
            <div className="input-month align-middle self-center">
              <label >Select a month</label>
              <input value={selectedMonth} defaultValue={"2024-07"} className="input" type="month" onChange={(event) => manageTransactionsBySelectedMonth(event.target.value)} />

            </div>

            <div className="all-monthly-transactions">
              <h2 className="">All clients monthly transactions ({new Date(selectedMonth + "-02").toLocaleString("default", { month: "long", year: "numeric" })}):</h2>
              <MonthlyTransactions clientsWithTransactions={aggregateDataByCity(clientsWithTransactions)} />
              <div >
                <ul className="transactions-by-month-list">
                  {clientsWithTransactions.map((item, index) => (
                    <li key={index}>
                      {item.client.name} - {item.transactions} Transaction(s)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <br />
          </section>
        )}

        {/* Withdraw report */}
        <button className="mt-5 mb-3" onClick={manageGenerateWithdrawReport}>{showOutsideWithdraws ? "Hide" : "Generate"} Withdraws outisde the city</button>
        {
          showOutsideWithdraws && withDrawReport.length > 0 && (
            <section className="withdraws-outside-section">
              <WithdrawChart withDrawReport={withDrawReport} />
              <ul className="transaction-by-month-outside">
                {withDrawReport.map((mov, index) => (
                  <li key={index}>
                    {mov.name} withdrew ${mov.totalWithdraw.toLocaleString()} <br /> in {mov.withdrawCity} on {mov.date}
                  </li>
                ))}
              </ul>
            </section>

          )
        }

      </>
    </main>
  );
}
