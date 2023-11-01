import { defineStore } from 'pinia';

/** Config State */
interface IConfigState {
  loading: boolean;
}

export default defineStore('global', {
  state: (): IConfigState => ({
    loading: false,
  }),
  getters: {
    getLoading: (state): boolean => state.loading,
  },
  actions: {
    act_setLoading(val: boolean) {
      this.loading = val;
    },
  },
  // Data persistence destination
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
    strategies: [
      {
        storage: localStorage,
        paths: ['loading'],
      }, // accessToken字段用 localstorage存储
    ],
  },
});
