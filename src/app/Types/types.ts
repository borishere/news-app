export type ItemType = {
    id: number
    deleted?: boolean
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
    by: string
    time: number
    text: string
    dead?: boolean
    parent: number
    poll?: number
    kids: string[]
    url: string
    score: number
    title: string
    parts?: number[]
    descendants: number,
    error?: any
};

export type CommentType = ItemType & {
    text: string
};