import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Transition } from 'semantic-ui-react';
import { useAppDispatch } from '../../app/store';
import AppLoader from '../../Components/AppLoader';
import CommentItem from './CommentItem';
import { fetchComments, selectAllComments } from './CommentsSlice';

type CommentsListProps = {
    commentsIds: string[]
    parentId: string
}

const CommentsList: React.FC<CommentsListProps> = ({ commentsIds, parentId }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const [status, setStatus] = useState('loading');

    let comments = useSelector(selectAllComments);

    comments = comments.filter(comment => +comment.parent === +parentId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        let request: any;
        let fulfilled = false;

        if (status === 'loading') {
            request = dispatch(fetchComments(commentsIds));

            request
                .then(unwrapResult)
                .then(() => {
                    fulfilled = true;
                    setStatus('loaded');
                })
                .catch((error: any) => {
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
        <div style={comments.length ? { marginTop: '20px' } : undefined}>
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