import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Transition } from 'semantic-ui-react';
import AppLoader from '../../Components/AppLoader';
import CommentItem from './CommentItem';
import { fetchComments, selectAllComments } from './CommentsSlice';

const CommentsList = ({ commentsIds, parentId }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const [status, setStatus] = useState('loading');

    let comments = useSelector(selectAllComments);

    comments = comments.filter(comment => +comment.parent === +parentId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        let request;
        let fulfilled = false;

        if (status === 'loading') {
            request = dispatch(fetchComments(commentsIds));

            request
                .then(unwrapResult)
                .then(() => {
                    fulfilled = true;
                    setStatus('loaded');
                })
                .catch(error => {
                    if (error.message && error.message !== 'Aborted') {
                        setStatus('failed');
                    }
                });
        }

        return () => {
            if (status === 'loading' && !fulfilled) {
                request.abort();
            }
        }
    }, [status, dispatch, commentsIds]);

    let commentsList = (
        <div style={comments.length ? { marginTop: '20px' } : null}>
            {
                comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            }
        </div>
    );

    return (
        <div>
            { status === 'loading' && <AppLoader />}
            {
                status === 'failed' && (
                    <div style={{ marginTop: '10px' }}>
                        Failed loading comments.
                    </div>
                )
            }
            <Transition.Group duration={500}>
                {status === 'loaded' && commentsList}
            </Transition.Group>
        </div>
    )
};

export default React.memo(CommentsList);