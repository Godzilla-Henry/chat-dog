<template lang="pug">
q-layout#layout(view='hHh Lpr lFf')
  // Header
  q-header.header
    q-toolbar
      q-avatar(icon="pets" size="xl")
      q-toolbar-title.text-weight-bolder Doggy Chat
      q-btn.q-ml-sm(label='Logout' color='white' flat @click="logout")
  // Side 
  q-drawer(
    value='true' 
    show-if-above 
    :width='350'
    :breakpoint='500' 
    bordered
  )
    q-item.q-py-sm
      q-item-section.justify-center(top avatar)
        q-btn(flat round color="primary" icon="sort")
      q-item-section
        q-input(dense rounded outlined label="filter")
          template(v-slot:append)
            q-btn(flat round color="grey" icon="search")
    q-separator
    q-scroll-area.userScroll
      q-list
        template(v-for='(user, index) in userList' :key='index')
          q-item.q-py-lg(clickable @click="openChat(user)" :active="user.id === curActive" active-class="curActiveClass")
            q-item-section.justify-center(top avatar)
              q-avatar(color='primary' size="md" text-color='white' icon='person')
                q-badge(rounded floating :color="user.online? 'green': 'grey'")
            q-item-section
              q-item-label {{ user.name }}
              q-item-label(caption lines='2' v-show="user.content" :class="{'text-weight-bold': !user.contentIsRead && user.contentSender!=myself, 'text-primary': !user.contentIsRead  && user.contentSender!=myself}") {{ user.content }}
            q-item-section(side top)
              q-item-label(caption v-show="user.content") {{ diffTime(user.contentTime) }} mins ago
          q-separator
    q-separator
    q-item.q-py-md
      q-item-section.justify-center(top avatar)
        q-avatar.q-mx-md(color='orange' size="md" text-color='white' icon='person')
      q-item-section
        q-item-label.text-weight-bold.text-primary {{myself}}
        div
          q-badge.q-mr-xs(rounded :color="online? 'green': 'grey'" align="middle")
          q-btn-dropdown(color="primary" size="12px" padding="0" flat :label="online? '上線中': '離線'") 
            q-list
              q-item(clickable :active="online" @click="changeOnline(true)")
                q-item-section
                  q-item-label 上線中
              q-item(clickable :active="!online" @click="changeOnline(false)")
                q-item-section
                  q-item-label 離線
  // Wrapper Page
  q-page-container
    router-view
</template>

<script lang="ts">
import { useUser } from 'src/stores';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import db from 'src/boot/firebase';
import {
  and,
  collection,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { getOtherUsers, switchUserOnline } from 'src/pages/login/useLogin';
import { diffTime } from 'src/Utils/useDayjs';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const $q = useQuasar();
    const userStore = useUser();
    const router = useRouter();
    const userList = ref<any[]>([]);

    const curActive = ref('');
    const online = computed(() => userStore.getOnline);
    const myself = computed(() => userStore.getName);

    const openChat = (user: any) => {
      console.log('openChat');
      curActive.value = user.id;
      router.push({
        path: `/DoggyChat/ChatBox/${user.id}`,
        query: { to: user.name },
      });
    };

    const logout = async () => {
      await changeOnline(false);
      userStore.$reset();
      router.replace({ path: '/Login' });
    };

    const createSnap = async (myself: any, toUser: any, index: number) => {
      console.log(myself, toUser);
      const q = query(
        collection(db, 'chatMessage'),
        or(
          and(where('sender', '==', myself), where('receiver', '==', toUser)),
          and(where('sender', '==', toUser), where('receiver', '==', myself))
        ),
        orderBy('datetime', 'desc'),
        limit(1)
      );

      await onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data();
          data.id = change.doc.id;
          if (change.type === 'added') {
            console.log('New', data);
            userList.value[index].contentId = data.id;
            userList.value[index].contentSender = data.sender;
            userList.value[index].content = data.content;
            userList.value[index].contentTime = data.datetime;
            userList.value[index].contentIsRead = data.isRead;
            if (data.sender != userStore.getName) {
              $q.notify({
                message: data.sender + '  : ' + data.content,
                icon: 'announcement',
                color: 'green',
                position: 'top-right',
                timeout: 1500,
              });
            }
          }
          if (change.type === 'modified') {
            console.log('Modified');
            let index = userList.value.findIndex(
              (item: any) => item.contentId === data.id
            );
            userList.value[index].contentId = data.id;
            userList.value[index].contentSender = data.sender;
            userList.value[index].content = data.content;
            userList.value[index].contentTime = data.datetime;
            userList.value[index].contentIsRead = data.isRead;
          }
          if (change.type === 'removed') {
            console.log('Removed', data);
            // let index = messageList.findIndex((item: any) => item.id === data.id);
            // console.log('Delete index: ', index);
            // messageList.splice(index, 1);
          }
        });
      });
    };

    const changeOnline = (val: boolean) => {
      const swicthForm = {
        id: userStore.getId,
        online: val,
      };
      switchUserOnline(swicthForm)
        .then((res: any) => {
          console.log(res);
          userStore.act_setUserInfo({
            id: res.result.id,
            name: res.result.name,
            phone: res.result.phone,
            email: res.result.email,
            address: res.result.address,
            describe: res.result.describe,
            online: res.result.online,
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    onMounted(async () => {
      const q = query(
        collection(db, 'chatUsers'),
        where('name', '!=', userStore.getName)
      );
      await onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data();
          data.id = change.doc.id;
          if (change.type === 'added') {
            userList.value.push(data);
          }
          if (change.type === 'modified') {
            let index = userList.value.findIndex(
              (item: any) => item.id === data.id
            );
            Object.assign(userList.value[index], data);
          }
          if (change.type === 'removed') {
            // let index = users.findIndex((item: any) => item.id === data.id);
            // console.log('Delete index: ', index);
            // users.splice(index, 1);
          }
        });
      });
      getOtherUsers(userStore.getName)
        .then((res: any) => {
          console.log(res);

          res.result.forEach((user: any, index: number) => {
            createSnap(userStore.getName, user.name, index);
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    });

    return {
      userList,
      curActive,
      myself,
      online,
      openChat,
      logout,
      diffTime,
      changeOnline,
    };
  },
});
</script>

<style lang="scss" scoped>
#layout {
  .header {
    height: 50px;
  }
  .userScroll {
    height: calc(100% - 140px);
  }
}

.curActiveClass {
  background-color: $grey-3;
}
</style>
