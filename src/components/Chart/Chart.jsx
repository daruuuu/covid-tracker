import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineData = {
    labels: dailyData.map(({ date }) => date),
    datasets: [
      {
        data: dailyData.map(({ confirmed }) => confirmed),
        label: "Infected",
        borderColor: "#3333ff",
        fill: true,
      },
      {
        data: dailyData.map(({ deaths }) => deaths),
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Infected", "Recovered", "Deaths"],
    datasets: [
      {
        label: "People",
        backgroundColor: [
          "rgba(0, 0, 255, 0.5)",
          "rgba(0, 255, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
        ],
        data: [confirmed.value, recovered.value, deaths.value],
      },
    ],
  };

  const barOptions = {
    legend: { display: false },
    title: { display: true, text: `Current state in ${country}` },
  };

  return (
    <div className={styles.container}>
      {dailyData.length && country ? (
        <Bar data={barData} options={barOptions} />
      ) : (
        <Line data={lineData} />
      )}
    </div>
  );
};

export default Charts;
