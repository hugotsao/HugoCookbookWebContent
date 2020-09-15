export interface Article {
    id: number,
    title: string,
    categoryId: number,
    tags: Array<string>,
    ref: Array<string>,
    DateCreation: Date,
    DateLastModified: Date
}