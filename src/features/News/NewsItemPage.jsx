import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import CommentsList from '../Comments/CommentsList';
import { NewsDate } from './NewsDate';
import { fetchNewsItem, selectById } from './newsSlice';

const NewsItemPage = ({ match }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const newsId = match.params.id;
    const newsItem = useSelector(state => selectById(state, newsId));
    const { title, url, by, time, descendants, kids = [] } = newsItem;

    const itemUpdate = () => {
        dispatch(fetchNewsItem(newsId));
    };

    useEffect(() => {
        const updateInterval = setInterval(() => {
            dispatch(fetchNewsItem(newsId));
        }, 60000);

        return () => {
            clearInterval(updateInterval);
        }
    }, [dispatch, newsId]);

    return (
        <div>
            <Button
                className='refresh-comments-btn'
                icon='refresh'
                content='Refresh Comments'
                size='large'
                onClick={itemUpdate}
            />
            <Button
                className='home-btn'
                icon='home'
                content='News List'
                size='large'
                onClick={() => history.push('/')}
            />
            <Card centered fluid>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <NewsDate timestamp={time} />
                    </Card.Meta>
                    <Card.Description>
                        <div className='card-url'>{url}</div>
                        <div>By {by}</div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='comments' />
                    {descendants} comments
                    <CommentsList commentsIds={kids} parentId={newsId} />
                </Card.Content>
            </Card>
        </div>
    )
}

export default React.memo(NewsItemPage);