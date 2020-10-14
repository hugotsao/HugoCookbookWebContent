export interface Article {
    articleId: string,
    title: string,
    categoryId: string,
    tags: Array<string>,
    ref: Array<string>,
    DateCreation: Date,
    DateLastModified: Date
}
export interface Category {
    categoryId: string,
    categoryName: string
}
export interface Content {
    articleId: string,
    content: string
}