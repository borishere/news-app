import React, { MouseEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Comment, Transition } from 'semantic-ui-react';
import { DateItem } from '../../Components/DateItem';
import { fetchComments, selectAllComments } from './CommentsSlice';
import AppLoader from '../../Components/AppLoader';
import { useAppDispatch } from '../../app/store';
import { CommentType } from './CommentsSlice';

const CommentItem: React.FC<{ comment: CommentType }> = ({ comment }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const { id, by, time, text, kids = [] } = comment;

    let comments = useSelector(selectAllComments);
    let childComments = comments.filter(comment => +comment.parent === +id);

    let parsedText;

    if (text) {
        parsedText = parse(text);
    }

    let classes = [];

    if (kids.length) {
        classes.push('is-parent-comment');
    }

    const commentClick: MouseEventHandler = (): void => {
        if (kids.length) {
            setLoading(true);

            const request: any = dispatch(fetchComments(kids));

            request.then(() => {
                setLoading(false);
            });
        }
    };

    return (
        <Comment.Group threaded size='large'>
            <Comment>
                <Comment.Content className={classes.join(' ')} onClick={commentClick}>
                    <Comment.Author as='span'>
                        {by}
                    </Comment.Author>
                    <Comment.Metadata>
                        <DateItem timestamp={time} />
                    </Comment.Metadata>
                    <Comment.Text>
                        {parsedText}
                    </Comment.Text>
                </Comment.Content>
                {
                    loading && <AppLoader />
                }
                <Transition.Group animation='slide down' duration={300}>
                    {
                        childComments.map(child => (
                            <div key={child.id}>
                                <CommentItem comment={child} />
                            </div>
                        ))
                    }
                </Transition.Group>
            </Comment>
        </Comment.Group>
    );
};

export default React.memo(CommentItem);
