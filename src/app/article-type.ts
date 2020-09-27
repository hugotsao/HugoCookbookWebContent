export interface Article {
    articleId: number,
    title: string,
    categoryId: number,
    tags: Array<string>,
    ref: Array<string>,
    DateCreation: Date,
    DateLastModified: Date
}