import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import CommentsList from '../Comments/CommentsList';
import { DateItem } from '../../Components/DateItem';
import { fetchNewsItem, selectById } from './newsSlice';
import { UPDATE_TIMEOUT } from '../../app/Constants/constants';
import { RootState, useAppDispatch } from '../../app/store';

interface RouterProps {
    id: string;
}

interface NewsItemPageProps extends RouteComponentProps<RouterProps> { }

const NewsItemPage: React.FC<NewsItemPageProps> = ({ match }) => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const newsId = match.params.id;
    const newsItem = useSelector((state: RootState) => selectById(state, newsId));

    const [loading, setLoading] = useState(false);

    const itemUpdate = (): void => {
        setLoading(true);

        dispatch(fetchNewsItem(newsId)).then(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        const updateInterval = setInterval(() => {
            dispatch(fetchNewsItem(newsId));
        }, UPDATE_TIMEOUT);

        return () => {
            clearInterval(updateInterval);
        }
    }, [dispatch, newsId]);

    if (!newsItem) {
        return (
            <h2 style={{ textAlign: 'center' }}>
                News not found.
            </h2>
        )
    }

    const { title, url, by, time, descendants, kids = [] } = newsItem;

    return (
        <div>
            <Button
                className='refresh-comments-btn'
                icon='refresh'
                content='Refresh Comments'
                size='large'
                loading={loading}
                disabled={loading}
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
                        <DateItem timestamp={time} />
                    </Card.Meta>
                    <Card.Description>
                        <div className="card-url-wrap">
                            <a href={url} target='blank' className="card-url">{url}</a>
                        </div>
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