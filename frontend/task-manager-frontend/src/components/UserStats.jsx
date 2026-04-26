import React from "react";
import { useState, useEffect } from "react";
import { getUserStats } from "../services/taskService";

export default function UserStats({userId, tasks, onStatsLoaded}){

    const [stats, setStats] = useState(null);

    useEffect(() =>{

        getUserStats(userId)
        .then(data => {
            setStats(data)
            onStatsLoaded(data)
        })

    },[userId,tasks]);

    if (!stats) return <p>Loading stats...</p>;

    return(
        <div>

            <h2>User Statistics</h2>
            <p>Total Tasks: <strong>{stats.totalTasks}</strong></p>
            <p>Completed Tasks: <strong>{stats.completedTasks}</strong></p>
            <p>Pending Tasks: <strong>{stats.pendingTasks}</strong></p>

            {/* Progress Bar */}
            <div>
                <p>Progress: {stats.progress.toFixed(0)}%</p>
                <progress value={stats.completedTasks} max={stats.totalTasks}/>
            </div>


        </div>

    );

}