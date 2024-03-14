import type { User } from "@/types/global"
import { http } from "@/utils/http"

/**
 * 修改地址
 * @param userId 
 * @param userAddress 
 * @returns 
 */
export const updateAddressAPI = (userId: number, user: User) => {
    return http({
        method: 'PATCH',
        url: `/user/${userId}`,
        data: user
    })
}