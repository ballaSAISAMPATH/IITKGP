import React, { useState, useEffect } from 'react';
import './Statistic.css'
import { FaQuestion } from "react-icons/fa6";

import { PieChart,Pie,Cell,Legend } from 'recharts';
export default function Statistics({ res }) {
    const [paragraphInsight, setParagraphInsight] = useState('');
  
    const [negative, setNegative] = useState(0);
      const [neutral, setNeutral] = useState(0);
      const [positive, setPositive] = useState(0);

    // Using useEffect to update the paragraphInsight only once when res.data changes
    useEffect(() => {
        if (res.data) {
            setParagraphInsight(res.data.paragraph_insight);
            setNegative(
                res.data.detailed_report.sentiment_distribution?.Negative || 0
              );
              setPositive(
                res.data.detailed_report.sentiment_distribution?.Positive || 0
              );
              setNeutral(res.data.detailed_report.sentiment_distribution?.Neutral || 0);
        }
    }, [res.data]); // This will run when res.data changes
    const pieData = [
        { name: "Positive", value: positive },
        { name: "Negative", value: negative },
        { name: "Neutral", value: neutral },
      ];
      const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

    return (
        // <div>
        //     <div className='text-center fs-3'><u>STATS</u></div>
        //     <div>{paragraphInsight}</div>
        // </div>
    <div className="stats-container">
    <div className="stats-title text-center"><span>What customers</span> Say <span className='speak'></span><FaQuestion className='mb-2'/>
    </div>
    <div className="stats-content">{paragraphInsight}</div>
    <div className='stats-pie-container'>
    <div className='stats-container w-50 d-flex flex-column'>

        <div className='fb'>
            <b>Critical Negative Feedback :</b><br/>
            "<i>{res.data.detailed_report.representative_reviews.Negative[0]}</i>"<br/>
            "<i>{res.data.detailed_report.representative_reviews.Negative[1]}</i>" are those repeating feedbacks to be put effort on.<br/>
            <b>Metrics or pain points that people found dissappointed : </b><br/>
            {(res.data.detailed_report.distinctive_terms.Negative).map((individual)=>{
                return <span>'<i>{individual[0]}</i>', </span>
            })}
        
        </div>
        <br/>
        <div className='fb'>
            <b>Critical Positive Feedback :</b><br/>
            "<i>{res.data.detailed_report.representative_reviews.Positive[0]}</i>"<br/>
            "<i>{res.data.detailed_report.representative_reviews.Positive[1]}</i>" are those repeating positive feedbacks <br/>
            <b>Metrics or key points that people liked the most :</b><br/>
            {(res.data.detailed_report.distinctive_terms.Positive).map((individual)=>{
                return <span>'<i>{individual[0]}</i>', </span>
            })}

        </div>
        <br/>
        <div className='fb'>
        <b>Critical Neutral Feedback :</b><br/>
            "<i>{res.data.detailed_report.representative_reviews.Neutral[0]}</i>"<br/>
            "<i>{res.data.detailed_report.representative_reviews.Neutral[1]}</i>" are the most repeating feedbacks <br/>
            <b>Metrics or key points that were found average :</b><br/>
            {(res.data.detailed_report.distinctive_terms.Neutral).map((individual)=>{
                return <span>'<i>{individual[0]}</i>', </span>
            })}

        </div>
        </div>

       <div className="chart-box">
                     <h2>
                       <span>Pie</span> Chart
                     </h2>
                     <PieChart className="chart" width={600} height={400}>
                       <Pie
                         data={pieData}
                         dataKey="value"
                         nameKey="name"
                         cx="50%"
                         cy="50%"
                         outerRadius={150}
                         label
                       >
                         {pieData.map((entry, index) => (
                           <Cell
                             key={`cell-${index}`}
                             fill={COLORS[index % COLORS.length]}
                           />
                         ))}
                       </Pie>
                       <Legend/>
                     </PieChart>
                   </div>
        </div>
       
</div>

    );
}
