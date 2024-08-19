import React from 'react'
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlyTransactions = ({ clientsWithTransactions }: any) => {
    return (
      <ResponsiveContainer className={"p-5"} minWidth={1920} width="100%" height={400}>
        <ComposedChart
          data={clientsWithTransactions}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="city" tick={{ fill: '#007BFF' }} />
          <YAxis tick={{ fill: '#007BFF' }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="transactions"
            fill="#8884d8"
            stroke="#8884d8"
          />

          <Bar dataKey="transactions" barSize={20} fill="#413ea0" />

          <Line type="monotone" dataKey="transactions" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>

    );
  };
export default MonthlyTransactions
