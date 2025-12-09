export const getLink = (type: string, id: number) => {
    switch (type) {
        case 'LIKE':
        case 'COMMENT':
        case 'REPLY':
            return `/view-blog/${id}`;
        case 'FOLLOW':
            return `/profile/${id}`;
        default:
            return '/';
    }
};