//废品类型
export type Garbage = {
    garbageId: number,
    garbageName: string,
    garbageType: string,
    garbageAmount: number,
    garbagePrice: number,
    garbageScore: number,
    garbageDescription: string,
    category: Category,
    user: User,
    pic: Pic,
}

//用户类型
export type User = {
    userId: number,
    userName: string,
    userPass: string,
    userPhone: string,
    userEmail: string,
    userAddress: string,
    userRank: number,
    userAmount: number,
    pic: Pic
}

//图片类型
export type Pic = {
    picId: number,
    picUrl: string,
    picType: string
}

//评论类型
export type Comment = {
    commentId: number,
    commentContent: string,
    commenScore: number,
    commentTime: string,
}

//分类类型
export type Category = {
    categoryId: number,
    categoryName: string,
}

//页码类型
export type Page = {
    page?: number,
    pageSize?: number
}

//消息类型
export type Message = {
    messageId?: number,
    messageContent: string,
    messageTime?: Date,
    messageIsRead?: boolean,
    sender: number,
    recipient: number
}

//收藏夹类型
export type Collection = {
    collectionId?: number,
    collectionName: string,
    user: number
}
