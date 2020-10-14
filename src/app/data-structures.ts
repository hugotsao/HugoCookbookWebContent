export interface Article {
    articleId: string,
    title: string,
    categoryId: string,
    tags: string[],
    references: string[],
    publishDate: Date,
    modifiedDate: Date
}
export interface Category {
    categoryId: string,
    categoryName: string
}
export interface Content {
    articleId: string,
    content: string
}