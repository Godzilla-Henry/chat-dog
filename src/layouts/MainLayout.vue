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
    q-scroll-area.fit.q-py-md
      q-list
        template(v-for='(user, index) in userList' :key='index')
          q-item.q-py-lg(clickable @click="openChat(user)" :active="user.id === curActive" active-class="curActiveClass")
            q-item-section.justify-center(top avatar)
              q-avatar(color='primary' size="md" text-color='white' icon='person')
            q-item-section
              q-item-label {{ user.name }}
              q-item-label(caption lines='2' v-show="user.content") {{ user.content }}
            q-item-section(side top)
              q-item-label(caption v-show="user.content") {{ diffTime(user.contentTime) }} mins ago
          q-separator
  // Wrapper Page
  q-page-container
    router-view
</template>

<script lang="ts">
import { useUser } from 'src/stores';
import { defineComponent, onMounted, ref, watch } from 'vue';
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
import { getOtherUsers } from 'src/pages/login/useLogin';
import { diffTime } from 'src/Utils/useDayjs';

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const userStore = useUser();
    const router = useRouter();
    const userList = ref<any[]>([]);

    const curActive = ref('');

    const openChat = (user: any) => {
      console.log('openChat');
      curActive.value = user.id;
      router.push({
        path: `/DoggyChat/ChatBox/${user.id}`,
        query: { to: user.name },
      });
    };

    const logout = () => {
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
            userList.value[index].content = data.content;
            userList.value[index].contentTime = data.datetime;
          }
          if (change.type === 'modified') {
            console.log('Modified');
            // let index = users.findIndex((item: any) => item.id === data.id);
            // Object.assign(users[index], data);
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
            // let index = users.findIndex((item: any) => item.id === data.id);
            // Object.assign(users[index], data);
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
      openChat,
      logout,
      diffTime,
    };
  },
});
</script>

<style lang="scss" scoped>
#layout {
  .header {
    height: 50px;
  }
}

.curActiveClass {
  background-color: $grey-3;
}
</style>
