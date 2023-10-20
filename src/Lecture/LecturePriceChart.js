import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LecturePriceChart = () => {

    // TO-DO : lectureId로 강의할인가, 날짜를 리스트로 받아온다.

    // TO-DO : 가져온 데이터를 세팅한다.


    useEffect(() => {
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1,
                    stepped: true,
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    axis: 'x'
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <div>
            <canvas id="myChart"></canvas>
        </div>
    );
}

export default LecturePriceChart;
