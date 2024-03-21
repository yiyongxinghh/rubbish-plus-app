import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageSore = defineStore('message', () => {
    const sender = ref<number>();

    const recipient = ref<number>();

    const saveData = (s: number, r: number) => {
        sender.value = s
        recipient.value = r
    }

    return {
        sender,
        recipient,
        saveData
    }
})