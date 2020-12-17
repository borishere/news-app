import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react'
import { selectById } from './newsSlice';
import { DateItem } from '../../Components/DateItem';

export const News = ({ id }) => {
    const history = useHistory();

    const newsItem = useSelector(state => selectById(state, id));
    const { title, time, by, score } = newsItem;

    const openNewsDetails = () => {
        history.push(`/news/${id}`);
    };

    return (
        <List.Item onClick={openNewsDetails}>
            <List.Content>
                <List.Header>{title}</List.Header>
                <List.Description>
                    <DateItem timestamp={time} />
                </List.Description>
                <div className='author'>by {by}</div>
                <div className='rating'>
                    <Icon color='yellow' name='star' />
                    <span className="rating-count">{score}</span>
                </div>
            </List.Content>
        </List.Item >
    )
}