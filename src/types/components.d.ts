import RpSwiper from '@/components/RpSwiper.vue'
import RpGuess from '@/components/RpGuess.vue'
import RpTabbar from '@/components/RpTabbar.vue'
import RpPageSkeleton from '@/components/RpPageSkeleton.vue'
import RpTitle from '@/components/RpTitle.vue'

// 声明全局组件
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RpSwiper: typeof RpSwiper
    RpGuess: typeof RpGuess
    RpTabbar: typeof RpTabbar
    RpPageSkeleton: typeof RpPageSkeleton
    RpTitle: typeof RpTitle
  }
}

//组件实例
export type RpGuessInstance = InstanceType<typeof RpGuess>
export type RpTitleInstance = InstanceType<typeof RpTitle>