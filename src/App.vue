<template lang="pug">
Loading#loading(v-if="loading")
router-view
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Loading from 'src/components/LoadingComponent.vue';
import { useGlobal } from './stores';

export default defineComponent({
  name: 'App',
  components: { Loading },
  setup() {
    const globalStore = useGlobal();
    const loading = computed(() => globalStore.getLoading);
    return { loading };
  },
});
</script>

<style lang="scss" scoped>
#loading {
  position: absolute;
  z-index: 99999;
}
</style>
