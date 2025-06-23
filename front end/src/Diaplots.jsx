import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";
import "./Diaplot.css";

const ChartComponent = ({ res, isSubmitted }) => {
  const [barplotPositive, setbarplotPositive] = useState(0);
  const [barplotNeutral, setbarplotNeutral] = useState(0);
  const [barplotNegative1, setbarplotNegative1] = useState(0);
  const [barplotNegative2, setbarplotNegative2] = useState(0);
  const [barplotNegative3, setbarplotNegative3] = useState(0);
  const [barplotNegative4, setbarplotNegative4] = useState(0);
  const [barplotNegative5, setbarplotNegative5] = useState(0);
  const [barplotNegative6, setbarplotNegative6] = useState(0);
  const [barplotNegative7, setbarplotNegative7] = useState(0);
  const [barplotNegative8, setbarplotNegative8] = useState(0);
  const [barplotNegative9, setbarplotNegative9] = useState(0);
  const [barplotNegative10, setbarplotNegative10] = useState(0);
  const [barplotNegative11, setbarplotNegative11] = useState(0);
  const [barplotNegative12, setbarplotNegative12] = useState(0);
  console.log(res.data.detailed_report.sentiment_terms.Positive[0][1]);
  useEffect(() => {
    if (res?.data) {
      setbarplotNegative1(
        res.data.detailed_report.sentiment_terms?.Negative[0][1] || 0
      );

      setbarplotNegative2(
        res.data.detailed_report.sentiment_terms?.Negative[1][1] || 0
      );
      setbarplotNegative3(
        res.data.detailed_report.sentiment_terms?.Negative[2][1] || 0
      );
      setbarplotNegative4(
        res.data.detailed_report.sentiment_terms?.Negative[3][1] || 0
      );
      setbarplotNegative5(
        res.data.detailed_report.sentiment_terms?.Positive[0][1] || 0
      );
      setbarplotNegative6(
        res.data.detailed_report.sentiment_terms?.Positive[1][1] || 0
      );
      setbarplotNegative7(
        res.data.detailed_report.sentiment_terms?.Positive[2][1] || 0
      );
      setbarplotNegative8(
        res.data.detailed_report.sentiment_terms?.Positive[3][1] || 0
      );
      setbarplotNegative9(
        res.data.detailed_report.sentiment_terms?.Neutral[0][1] || 0
      );
      setbarplotNegative10(
        res.data.detailed_report.sentiment_terms?.Neutral[1][1] || 0
      );
      setbarplotNegative11(
        res.data.detailed_report.sentiment_terms?.Neutral[2][1] || 0
      );
      setbarplotNegative12(
        res.data.detailed_report.sentiment_terms?.Neutral[3][1] || 0
      );
    }
  }, [res]);

  const barData1 = [
    {
      name: res.data.detailed_report.sentiment_terms.Negative[0][0],
      negatives: barplotNegative1 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Negative[1][0],
      negatives: barplotNegative2 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Negative[2][0],
      negatives: barplotNegative3 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Negative[3][0],
      negatives: barplotNegative4 * 100,
    },
  ];
  const barData2 = [
    {
      name: res.data.detailed_report.sentiment_terms.Positive[0][0],
      Positives: barplotNegative5 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Positive[1][0],
      Positives: barplotNegative6 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Positive[2][0],
      Positives: barplotNegative7 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Positive[3][0],
      Positives: barplotNegative8 * 100,
    },
  ];
  const barData3 = [
    {
      name: res.data.detailed_report.sentiment_terms.Neutral[0][0],
      Neutrals: barplotNegative9 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Neutral[1][0],
      Neutrals: barplotNegative10 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Neutral[2][0],
      Neutrals: barplotNegative11 * 100,
    },
    {
      name: res.data.detailed_report.sentiment_terms.Neutral[3][0],
      Neutrals: barplotNegative12 * 100,
    },
  ];

  const lineData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 20 },
    { name: "Apr", value: 27 },
    { name: "May", value: 18 },
  ];

  const areaData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
  ];

  const radarData = [
    { subject: "Math", A: 120, fullMark: 150 },
    { subject: "Science", A: 98, fullMark: 150 },
    { subject: "English", A: 86, fullMark: 150 },
  ];

  const scatterData = [
    { x: 10, y: 30 },
    { x: 20, y: 50 },
    { x: 30, y: 70 },
    { x: 40, y: 90 },
  ];

  const composedData = [
    { name: "Jan", value1: 40, value2: 24, value3: 70 },
    { name: "Feb", value1: 30, value2: 13, value3: 80 },
    { name: "Mar", value1: 20, value2: 98, value3: 90 },
  ];

  return (
    <div className="chart-container">
      {isSubmitted && (
        <>
          <div className="chart-row">
            <div className="chart-box">
              <h2>
                <span className="words neg">Negatives</span>
              </h2>
              <BarChart width={340} height={300} data={barData1}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="negatives" fill="#ff3333" />
              </BarChart>
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-box">
              <h2>
                <span className="words">Positives</span>
              </h2>
              <BarChart width={340} height={300} data={barData2}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Positives" fill="#4CAF50" />
              </BarChart>
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-box">
              <h2>
                <span className="words neu">Neutrals</span>
              </h2>
              <BarChart width={340} height={300} data={barData3}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Neutrals" fill="#FFCE56" />
              </BarChart>
            </div>
          </div>

          {/* <div className="chart-row">
            <div className="chart-box">
              <h2>
                <span>Radar</span> Chart
              </h2>
              <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={600}
                height={500}
                data={radarData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Student A"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </div>

            <div className="chart-box">
              <h2>
                <span>Line</span> Chart
              </h2>
              <LineChart width={600} height={300} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-box">
              <h2>
                <span>Composed</span> Chart
              </h2>
              <ComposedChart width={600} height={400} data={composedData}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value1"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="value2" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="value3" stroke="#ff7300" />
              </ComposedChart>
            </div>

            <div className="chart-box">
              <h2>
                <span>Area</span> Chart
              </h2>
              <AreaChart width={600} height={400} data={areaData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-box">
              <h2>
                <span>Scatter</span> Chart
              </h2>
              <ScatterChart width={600} height={400}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="x-axis" unit="cm" />
                <YAxis type="number" dataKey="y" name="y-axis" unit="kg" />
                <Tooltip />
                <Scatter name="A school" data={scatterData} fill="#8884d8" />
              </ScatterChart>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default ChartComponent;
