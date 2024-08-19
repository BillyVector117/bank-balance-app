import { WithdrawReport } from '@/app/types';
import { formatCurrency } from '@/app/utils';
import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const WithdrawChart = ({ withDrawReport }: { withDrawReport: WithdrawReport[] }) => {
    return (
        <>
            <h2>Withdraws of at least $1,000,000 outside the city</h2>

            <ResponsiveContainer className={"p-5"} minWidth={1920} width="100%" height={400}>
                <AreaChart
                    width={900}
                    height={400}
                    data={withDrawReport.filter((d) => d.totalWithdraw > 1000000)}
                    syncId="anyId"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: '#007BFF' }} />
                    <YAxis width={100}
                        tick={{ dx: -10, fill: '#007BFF' }}
                        tickFormatter={(value: number) => (formatCurrency(value))} />
                    <Tooltip formatter={(value: number) => formatCurrency(value as number)}
                    />

                    <Area
                        type="monotone"
                        dataKey="totalWithdraw"
                        stroke="#8884d8"
                        fillOpacity={0.3}
                        fill="#8884d8"
                        name="total Withdraw"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
};

export default WithdrawChart
