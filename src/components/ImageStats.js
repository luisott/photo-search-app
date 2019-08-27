import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {getImageStatistics} from "../utils/queries";
import { Line } from 'react-chartjs-2';

const downloadsColors = {
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)'
    ],
    borderWidth: 1
};

const likesColors = {
    backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
    ],
    borderColor: [
        'rgba(54, 162, 235, 1)'
    ],
    borderWidth: 1
};

const viewsColors = {
    backgroundColor: [
        'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
        'rgba(153, 102, 255, 1)'
    ],
    borderWidth: 1
};



const props = {
    id: PropTypes.string
};

const ImageStats = ({id}) => {

    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchStatsAndUpdateState(id)
    }, [id]);

    const fetchStatsAndUpdateState = async (id) => {
        if (id) {
            try {
                const stats = await getImageStatistics(id);
                setStats(stats);
            } catch (e) {
                // TODO: Handle error
                console.log(e)
            }
        }
    };

    // TODO: Add string definitions
    const {downloads, likes, views} = stats;
    if (downloads && likes && views) {
        const dataToShow = {
            labels: downloads.historical.values.map(({date}) => date),
            datasets: [{
                label: 'Downloads',
                data: downloads.historical.values.map(({value}) => value),
                ...downloadsColors
            },{
                label: 'Views',
                data: views.historical.values.map(({value}) => value),
                ...viewsColors
            },{
                label: 'Likes',
                data: likes.historical.values.map(({value}) => value),
                ...likesColors
            }],
            options: {
                layout: {
                    padding: {
                        left: 5,
                        right: 5,
                        top: 0,
                        bottom: 0
                    }
                }
            },
            // options: {
            //     scales: {
            //         xAxes: [{
            //             type: 'time',
            //             bounds: 'ticks',
            //             time: {
            //                 unit: 'month'
            //             }
            //         }]
            //     }
            // }
        };
        return (
            <Line data={dataToShow}/>
        );
    } else {
        // Return a no data to show or something
        return (<div>adasd</div>)
    }

};
ImageStats.props = props;
export default ImageStats;