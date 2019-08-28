import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import StyledComponents from "styled-components";
import { Line } from 'react-chartjs-2';
import {getImageStatistics} from "../utils/queries";
import * as UIStrings from "../utils/uiStrings";


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

export const CenteredLoading = StyledComponents.div`
    display: flex;
    justify-content: center;
`;

const props = {
    id: PropTypes.string.isRequired
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

    const {downloads, likes, views} = stats;

    if (downloads && likes && views) {
        const dataToShow = {
            labels: downloads.historical.values.map(({date}) => date),
            datasets: [{
                label: UIStrings.DOWNLOADS,
                data: downloads.historical.values.map(({value}) => value),
                ...downloadsColors
            },{
                label: UIStrings.VIEWS,
                data: views.historical.values.map(({value}) => value),
                ...viewsColors
            },{
                label: UIStrings.LIKES,
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
            }
        };
        return (
            <Line data={dataToShow}/>
        );
    } else {
        return (
            <CenteredLoading>
                <CircularProgress/>
            </CenteredLoading>
        )
    }

};
ImageStats.props = props;
export default ImageStats;