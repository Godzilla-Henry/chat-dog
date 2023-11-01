<template lang="pug">
q-page
  .row.q-py-md.q-px-xl
    q-card.fit(flat)
      q-item
        q-item-section(avatar)
          q-avatar(color='primary' size="5em" text-color='white' icon='person')
        q-item-section
          .text-h5.text-weight-medium {{ name }}
          .text-subtitle1.text-weight-regular.text-grey-6  # {{ id }}
      q-separator

      .text-h6.text-grey-7.q-my-md
        q-btn(
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        )
        | Your Information
      q-slide-transition
        div(v-show="expanded")
          q-card-section.q-py-xs
            .text-body2 Phone
            q-input(outlined v-model="phone" placeholder="Type something..." dense)
          q-card-section.q-py-xs
            .text-body2 Email
            q-input(outlined v-model="email" placeholder="Type something..." dense)
          q-card-section.q-py-xs
            .text-body2 Address
            q-input(outlined v-model="address" placeholder="Type something..." dense)
          q-card-section.q-py-xs
            .text-body2 Describe Yourself
            q-input(outlined v-model="describe" placeholder="Type something..." dense type="textarea")
          q-card-section.q-py-sm.row.justify-end
            q-btn(label='Save' @click="onEdit" color='primary')
  
</template>

<script lang="ts">
import { useUser } from 'src/stores';
import { defineComponent, ref } from 'vue';
import { editUserInfo } from 'src/pages/login/useLogin';

export default defineComponent({
  setup() {
    const userStore = useUser();
    const id = userStore.id;
    const name = userStore.name;
    const phone = ref(userStore.phone);
    const email = ref(userStore.email);
    const address = ref(userStore.address);
    const describe = ref(userStore.describe);

    const expanded = ref<boolean>(true);

    const onEdit = () => {
      let editForm = {
        id: id,
        name: name,
        phone: phone.value,
        email: email.value,
        address: address.value,
        describe: describe.value,
      };
      editUserInfo(editForm)
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
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      id,
      name,
      phone,
      email,
      address,
      describe,
      expanded,
      onEdit,
    };
  },
});
</script>

<style scoped></style>
