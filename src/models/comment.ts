class Comment {
    id: number;
    userId: string;
    content: string;
    siteId: number;
    contentId: string;
    parentId: number;
    ip: string;
    createdAt: Date;

    constructor(
        id: number,
        userId: string,
        content: string,
        siteId: number,
        contentId: string,
        parentId: number,
        ip: string,
        createdAt: Date
    ) {
        this.id = id
        this.userId = userId
        this.content = content
        this.siteId = siteId
        this.contentId = contentId
        this.parentId = parentId
        this.ip = ip
        this.createdAt = createdAt
    }
}