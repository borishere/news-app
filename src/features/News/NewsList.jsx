import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List } from 'semantic-ui-react';
import AppLoader from '../../app/AppLoader';
import { News } from './News';
import { selectAll } from './newsSlice';
import { fetchNewsList } from "./newsSlice";

const NewsList = () => {
    const dispatch = useDispatch();

    const loadingStatus = useSelector(state => state.newsList.loading);
    const newsList = useSelector(selectAll);

    const newsListContent = newsList.map(news => (
        <News key={news.id} id={news.id} />
    ));

    const newsUpdate = () => {
        dispatch(fetchNewsList());
    };

    useEffect(() => {
        if (loadingStatus === 'idle') {
            dispatch(fetchNewsList());
        }
    }, [loadingStatus, dispatch]);

    useEffect(() => {
        const updateInterval = setInterval(() => {
            dispatch(fetchNewsList());
        }, 60000);

        return () => {
            clearInterval(updateInterval);
        }
    }, [dispatch]);

    let content;
    let newsListElement =
        <div>
            <List
                divided
                inverted
                ordered
                relaxed='very'
                content={newsListContent}
            />
        </div>

    if (loadingStatus === 'loading') {
        if (newsList.length) {
            content = newsListElement;
        } else {
            content = <AppLoader />
        }
    } else if (loadingStatus === 'succeeded') {
        content = newsListElement;
    }

    return (
        <div>
            <Button
                className='refresh-news-btn'
                icon='refresh'
                content='Refresh'
                size='large'
                onClick={newsUpdate}
            />
            {content}
        </div>
    );
};

export default NewsList;
