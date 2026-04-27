import React from "react";
import { useState, useEffect } from "react";
import { getUserStats } from "../services/taskService";
import { getTopCategories } from "../services/taskService";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

export default function UserStats({userId,stats, tasks}){

    console.log("Αυτό λαμβάνει το frontend από το API:", stats); // Δες εδώ στην κονσόλα του browser

    if (!stats) return <p>Loading stats...</p>;

    
        const toDoTasks = tasks.filter(t => t.status === 'TODO').length
        const doneTasks = tasks.filter(t => t.status === 'DONE').length
        const inProgresTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length
        const inReviewTasks = tasks.filter(t => t.status === 'REVIEW').length
    

    const pieData = [
        {name: 'COMPLETED', value: doneTasks, color: '#0eae00'},
        {name: 'IN PROGRESS', value: inProgresTasks, color:'#fffb00' },
        {name: 'IN REVIEW', value: inReviewTasks, color:'#3B82F6'},
        { name: 'TODO', value: toDoTasks, color: '#cfcfcf' },
    ];

    const priorityData = [
        { name: 'LOW', count: tasks.filter(t => t.priority === 'LOW').lengtη, color: '#0eae00' },
        { name: 'MEDIUM', count: tasks.filter(t => t.priority === 'MEDIUM').length, color:'#fffb00' },
        { name: 'HIGH', count: tasks.filter(t => t.priority === 'HIGH').length, color:'#f20000'}
    ];

    const topCategories = getTopCategories(tasks);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Statistics Dashboard</h2>
            
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Αριστερή πλευρά: Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h3 className="font-semibold text-gray-700 mb-4">Task Progress</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Δεξιά πλευρά: Bar Chart & Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 gap-6">
                    
                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-700 mb-4">Tasks by Priority</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={priorityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                                <Bar dataKey="count">
                                    {priorityData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Cards για Top Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(topCategories) && topCategories.length > 0 ? (
                            topCategories.map((cat, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm text-gray-500">Top Category</p>
                                        <p className="font-bold text-lg">{cat.name}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">{cat.tasks} Tasks</p>
                                        <p className="text-green-500 font-bold">{cat.completed} Completed</p>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <p className="text-gray-400 text-sm">No categories yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};