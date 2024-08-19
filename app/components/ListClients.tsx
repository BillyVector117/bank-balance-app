import React, { useState } from "react";

const ListClients = ({ clientsData, checkBalance, depositMoney, withdrawMoney, showInputDate, showDateInput, selectedClient, manageSelectedDate }: any) => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 5;

    // Calculate begining and last clients index to show
    const indexLastClient = currentPage * clientsPerPage;
    const indexFirstClient = indexLastClient - clientsPerPage;
    const currentClientsPage: any = clientsData.slice(indexFirstClient, indexLastClient);

    // Change page
    const nextPage = () => {
        if (indexLastClient < clientsData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <ul>
                {currentClientsPage.map((client: any) => (
                    <li key={client.id}>
                        <span className="label-client-name">
                            {client.name} - {client.city}

                        </span>
                        <button onClick={() => checkBalance(client.id)}>Check Balance</button>
                        <button onClick={() => depositMoney(client.id, 100000)}>Deposit $100,000</button>
                        <button onClick={() => withdrawMoney(client.id, 500000)}>Withdraw $500,000</button>
                        {(showDateInput && selectedClient?.id === client.id) ? (
                            <div>
                                <label htmlFor="filter-by-date">Select a month: </label>
                                <input type="month" onChange={manageSelectedDate} />
                            </div>
                        ) : (
                            <button onClick={() => showInputDate(client.id)}>Check monthly transactions</button>

                        )}
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-between">
                <button onClick={previousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={indexLastClient >= clientsData.length}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListClients;
