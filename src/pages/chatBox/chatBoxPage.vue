<template lang="pug">
.messageContainer
  q-card.fit
    // Header
    q-item.header
      q-item-section(avatar)
        q-avatar(color='primary' size="md" text-color='white' icon='person')
      q-item-section
        q-item-label {{ toUser }}
        q-item-label(caption) 5 mins ago
    q-separator

    // Massage
    q-card-section.main
      template(
        v-for="message in messageList"
      )
        .sender.row.items-center.justify-end(v-if="message.sender == myself")
          div.smallStatus
            div 已讀
            div {{ formatTime(message.datetime) }}
          .messageItem.q-px-md.q-py-sm.q-my-sm {{ message.content }}
        .other.row.items-center.justify-start(v-if="message.sender == toUser")
          q-avatar.q-ma-sm(color='primary' size="sm" text-color='white' icon='person')
          .messageItem.q-px-md.q-py-sm.q-my-sm {{ message.content }}
          div.smallStatus
            div {{ formatTime(message.datetime) }}

    q-separator
    // Message Input
    q-card-actions.footer
      q-avatar.q-mx-md(color='orange' size="md" text-color='white' icon='person')
      q-input.messageInput(rounded outlined dense v-model="messageContent" placeHolder="Send messages ..." @keypress.enter.prevent="onSend") 
        template(v-slot:after)
          q-btn.rotate-315(round dense flat icon="send" @click="onSend")
</template>

<script lang="ts">
import { useUser } from 'src/stores';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getMessageList, sendMessage } from './useMessage';
import { formatTime } from 'src/Utils/useDayjs';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const userStore = useUser();
    const route = useRoute();
    const myself = computed(() => userStore.getName);
    const toUser = computed(() => route.query.to);

    const messageContent = ref();
    const messageList = ref([]);

    const onSend = async () => {
      console.log('onSend');
      let message = {
        sender: myself.value,
        receiver: toUser.value,
        content: messageContent.value,
        datetime: Date.now(),
      };
      messageContent.value = '';
      await sendMessage(message);
    };

    watch(
      () => [myself.value, toUser.value],
      async (newVal) => {
        messageList.value = [];
        await getMessageList(newVal[0], newVal[1], messageList.value);
      },
      { immediate: true }
    );

    return {
      myself,
      toUser,
      messageContent,
      messageList,
      onSend,
      formatTime,
    };
  },
});
</script>

<style lang="scss" scoped>
.messageContainer {
  .header {
    height: 65px;
  }

  .main {
    height: calc(100vh - 185px);
    overflow-y: scroll;
    .sender {
      .smallStatus {
        font-size: 10px;
        text-align: right;
        margin-right: 5px;
        color: grey;
      }
      .messageItem {
        background: rgb(214, 214, 214);
        border-radius: 10px 10px 0px 10px;
      }
    }
    .other {
      .smallStatus {
        font-size: 10px;
        text-align: left;
        margin-left: 5px;
        margin-top: 15px;
        color: grey;
      }
      .messageItem {
        background: rgb(214, 214, 214);
        border-radius: 10px 10px 10px 0px;
      }
    }
  }

  .footer {
    height: 70px;
    .messageInput {
      width: calc(100% - 70px);
    }
  }
}
</style>
