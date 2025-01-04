import { storeToRefs } from 'pinia'
import { useAlertStore } from '@/store/alert'

export const useAlert = () => {
  const alerStore = useAlertStore()

  const { alerts } = storeToRefs(alerStore)
  const { vAlert, vSuccess } = alerStore

  return {
    alerts,
    vAlert,
    vSuccess,
  }
}

// const alerts = ref([])
// export function useAlert() {
//   const vAlert = (message, type = 'success') => {
//     alerts.value.push({ message, type })
//     setTimeout(() => {
//       alerts.value.shift()
//     }, 2000)
//   }
//   const vSuccess = message => vAlert(message, 'success')
//   return {
//     alerts,
//     vAlert,
//     vSuccess,
//   }
// }
