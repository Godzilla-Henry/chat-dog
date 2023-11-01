import { defineStore } from 'pinia';

/** Config State */
interface IConfigState {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  describe: string;
  online: boolean;
}

export default defineStore('user', {
  state: (): IConfigState => ({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    describe: '',
    online: false,
  }),
  getters: {
    getId: (state): string => state.id,
    getName: (state): string => state.name,
    getPhone: (state): string => state.phone,
    getEmail: (state): string => state.email,
    getAddress: (state): string => state.address,
    getDescribe: (state): string => state.describe,
    getOnline: (state): boolean => state.online,
  },
  actions: {
    // info
    act_setUserInfo(userInfo: IConfigState) {
      this.id = userInfo.id;
      this.name = userInfo.name;
      this.phone = userInfo.phone;
      this.email = userInfo.email;
      this.address = userInfo.address;
      this.describe = userInfo.describe;
      this.online = userInfo.online;
    },
    act_setUserOnline(val: boolean) {
      this.online = val;
    },
  },
  // Data persistence destination
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
    strategies: [
      {
        storage: localStorage,
        paths: [
          'id',
          'name',
          'phone',
          'email',
          'address',
          'describe',
          'online',
        ],
      }, // accessToken字段用 localstorage存储
    ],
  },
});
