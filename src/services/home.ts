import type { Banner, PanelItem, HotItem, GuessItem } from "@/types/home"
import type { Page } from "@/types/global"
import { http } from "@/utils/http"

/**
 * 获取轮播列表
 * @param page 
 * @param pageSize 
 * @returns 
 */
export const getHomeBannerAPI = (page: number, pageSize: number) => {
    return http<Banner>({
        method: 'GET',
        url: '/pic',
        data: { page, pageSize }
    })
}

/**
 * 获取分类面板列表
 * @returns 
 */
export const getPanelListAPI = () => {
    return http<PanelItem[]>({
        method: 'POST',
        url: '/panel',
    })
}

/**
 * 获取热门推荐
 * @param id 
 * @returns 
 */
export const getHomeHotAPI = () => {
    return http<Array<HotItem[]>>({
        method: 'POST',
        url: '/garbage/hot',
    })
}

/**
 * 获取猜你喜欢(请求分页)
 * @returns 
 */
export const getHomeGoodsGuessLikeAPI = (data?: Page) => {
    return http<GuessItem>({
        method: 'GET',
        url: '/garbage',
        data
    })
}