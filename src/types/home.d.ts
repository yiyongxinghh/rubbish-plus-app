import type { Garbage,Pic } from './global.d.ts'
//轮播图数据类型
export type BannerItem = {
    picId: number,
    picUrl: string,
    picType: string
}

//轮播图列表数据类型
export type Banner = {
    pics: BannerItem[],
    title: number
}

//前台面板数据类型
export type PanelItem = {
    panelId: number,
    panelName: string,
    panelDescription: string,
    panelUrl: string,
}

//热门推荐数据类型
export type HotItem = {
    garbageId: number,
    garbageName: string,
    garbageType: string,
    garbageAmount: number,
    garbagePrice: number,
    garbageScore: number,
    garbageDescription: string,
    pic: Pic,
}

//猜你喜欢数据类型
export type GuessItem = {
    garbages: Garbage[],
    total: number
}
