import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "../ui/button";
import { IoMdRefreshCircle } from "react-icons/io";
const COLORS = ["#2563eb", "#16a34a", "#f97316", "#eab308", "#8b5cf6", "#6b7280"];

export default function AppPerDay({ refreshFunction, loading = true, dailyCreated = [], dailyUpdated = [], loanStats = {}, topProfessions = [], topEducation = [] }) {
  const mergedData = dailyCreated.map((d, i) => ({
    date: d.date,
    created: d.count,
    updated: dailyUpdated[i]?.count || 0,
  }));

  const formatCurrency = (amount) => {
    if (!amount) return "Rs 0";
    return `Rs ${amount.toLocaleString("en-NP")}`;
  };

  return (
    <>
      <div className="space-y-10">
        <div className="px-8 py-6 bg-white ">
          <div className=" flex flex-row items-center justify-between">
            <h2 className=" font-semibold mb-6 text-gray-800">Applications Activity (Last 30 Days)</h2>
            <Button disabled={loading} variant="outline" onClick={() => refreshFunction()} type="button">
              Refresh {loading ? <span className=" loading loading-spinner loading-xs"></span> : <IoMdRefreshCircle className="size-5" />}
            </Button>
          </div>
          <div className="w-full h-72">
            {loading ? (
              <Loading />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mergedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="created" name="Created" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, stroke: "#1d4ed8", strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="updated" name="Updated" stroke="#16a34a" strokeWidth={3} dot={{ r: 5, stroke: "#15803d", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 py-4 bg-white rounded-lg shadow-sm">
        <h2 className="font-semibold mb-4 text-gray-800 ">Applicant Summary</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid grid-cols-2 gap-3 w-full md:w-1/3">
            {[
              { label: "Total", value: loanStats.totalAmount ?? 0 },
              { label: "Average", value: loanStats.avgAmount ?? 0 },
              { label: "Min", value: loanStats.minAmount ?? 0 },
              { label: "Max", value: loanStats.maxAmount ?? 0 },
            ].map((item) => (
              <div key={item.label} className="p-2 bg-gray-50 rounded-md flex flex-col items-center justify-center text-center">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className=" font-semibold text-gray-900">{loading ? <Loading /> : formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>

          {/* Top Professions Pie Chart */}
          <div className="w-full md:w-1/3 max-h-65 h-55 flex justify-center">
            {loading ? (
              <Loading />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topProfessions} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={60} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                    {topProfessions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Top Education Pie Chart */}
          <div className="w-full md:w-1/3 max-h-65 h-55 flex justify-center">
            {loading ? (
              <Loading />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topEducation} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={60} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                    {topEducation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow border border-gray-200 text-sm">
        <p className="font-medium text-gray-700 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="text-gray-600">
            {p.name}: <span className="font-semibold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Loading = () => {
  return <span className=" loading loading-lg loading-spinner"></span>;
};
