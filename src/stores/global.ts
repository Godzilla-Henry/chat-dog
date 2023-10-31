import { defineStore } from 'pinia';

/** Config State */
interface IConfigState {}

export default defineStore('global', {
  state: (): IConfigState => ({}),
  getters: {},
  actions: {},
  // Data persistence destination
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
    strategies: [
      {
        storage: localStorage,
        paths: ['chatBox'],
      }, // accessToken字段用 localstorage存储
    ],
  },
});
