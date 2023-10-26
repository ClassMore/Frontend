import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const LecturePriceChart = ({lectureId}) => {
    const [lectureData, setLectureData] = useState([]);

    const getLectures = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/lecture/${lectureId}/chart`);
            const source = response.data;
            setLectureData(source);
        } catch (error) {
            console.error('Error fetching data12:', error);
        }
    };

    useEffect(() => {
        getLectures();
    }, []);

    useEffect(() => {
        console.log(lectureData)
        if (lectureData.length > 0) {
            const ctx = document.getElementById('lecturePriceChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lectureData.map(item => item.date),
                    datasets: [{
                        label: 'Sale Price',
                        data: lectureData.map(item => item.salePrice),
                        borderWidth: 1,
                        borderColor: ['red'],
                        stepped: true,
                    }]
                },
                options: {
                    responsive: false,
                    interaction: {
                        intersect: false,
                        axis: 'x'
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    }, [lectureData]);

    return (
        <div class="lecture-price-chart custom">
            <canvas id="lecturePriceChart" style={{height:"60vh", width:"80vw"}}></canvas>
        </div>
    );
};
export default LecturePriceChart;
