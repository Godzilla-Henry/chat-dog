<template lang="pug">
div.loadingComponent
  h5 Loading
  #loading.gif
    #blue.rotate.left.gif
    #white.rotate.right.gif
    #darkblue.gif
      span.loading
      span.loading
      span.loading
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.loadingComponent {
  width: 100vw;
  height: 100vh;
  background: rgb(223, 233, 240);
  display: flex;
  justify-content: center;
  align-items: center;
}

h5 {
  color: #5197d6;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 900;
  margin-bottom: 70px;
}

#blue {
  /* NO WHITESPACE in </tag><tag> */
  background: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22Layer_1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20168%20168%22%20xml%3Aspace%3D%22preserve%22%20enable-background%3D%22new%200%200%20168%20168%22%3E%0A%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%0A%09.st0%7Bfill%3A%235197D6%3B%7D%0A%09.st1%7Bfill%3Anone%3B%7D%0A%0A%20%20%3C%2Fstyle%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Cpath%20class%3D%22st0%22%20d%3D%22M129.9%2038.4c-25.8-25.8-68-25.2-93%201.8%20-23.3%2025.1-22.7%2064.5%201.3%2088.9%2021.2%2021.7%2053.9%2025.2%2078.8%2010.5%201.5-0.9%203.2-1.1%204.9-0.7l18.4%205.1c2.2%200.6%204.3-1.4%203.7-3.7l-5-18.2c-0.5-1.7-0.2-3.4%200.7-4.9C154.5%2092.4%20151.3%2059.8%20129.9%2038.4z%22%2F%3E%0A%20%20%20%20%3Cellipse%20transform%3D%22matrix(0.7071%20-0.7071%200.7071%200.7071%20-34.6941%2084.199)%22%20class%3D%22st1%22%20cx%3D%2284.3%22%20cy%3D%2284%22%20rx%3D%2283.4%22%20ry%3D%2283.4%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E');
  width: 80px;
  height: 80px;
}

#white {
  /* NO WHITESPACE in </tag><tag> */
  background: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22Layer_1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20168%20168%22%20xml%3Aspace%3D%22preserve%22%20enable-background%3D%22new%200%200%20168%20168%22%3E%0A%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%0A%09.st0%7Bfill%3A%23FFFFFF%3B%7D%0A%09.st1%7Bfill%3Anone%3B%7D%0A%0A%20%20%3C%2Fstyle%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Cpath%20class%3D%22st0%22%20d%3D%22M113.8%20113.8c16.8-16.8%2016.4-44.4-1.2-60.7%20-16.4-15.2-42.1-14.8-58.1%200.8%20-14.2%2013.9-16.4%2035.2-6.8%2051.5%200.6%201%200.7%202.1%200.4%203.2l-3.3%2012c-0.4%201.5%200.9%202.8%202.4%202.4l11.9-3.3c1.1-0.3%202.2-0.1%203.2%200.5C78.5%20129.9%2099.8%20127.8%20113.8%20113.8z%22%2F%3E%0A%20%20%20%20%3Cellipse%20transform%3D%22matrix(0.7071%20-0.7071%200.7071%200.7071%20-34.7943%2083.9992)%22%20class%3D%22st1%22%20cx%3D%2284%22%20cy%3D%2284%22%20rx%3D%2254.5%22%20ry%3D%2254.5%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E');
  width: 80px;
  height: 80px;
}

#darkblue {
  width: 80px;
  height: 80px;
}

.gif {
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
}

.rotate {
  animation-duration: 4s;
  /*animation-timing-function: linear;*/
  animation-iteration-count: infinite;
}

@keyframes left {
  0% {
    transform-origin: center center;
    transform: rotate(360deg);
    opacity: 1;
  }
  100% {
    transform-origin: center center;
    transform: rotate(0);
    opacity: 1;
  }
}
.left {
  animation-name: left;
}

@keyframes right {
  0% {
    transform-origin: center center;
    transform: rotate(-360deg);
    opacity: 1;
  }
  100% {
    transform-origin: center center;
    transform: rotate(0);
    opacity: 1;
  }
}
.right {
  animation-name: right;
}

.loading {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #155d93 /*#5197d6*/;
  border-radius: 50%;
  /*box-shadow: 0 0 2px black;*/
  animation: loading 4s infinite;
}

.loading:nth-child(1) {
  animation-delay: 0.6s;
  width: 4px;
  height: 4px;
  left: -15px;
}

.loading:nth-child(2) {
  animation-delay: 0.8s;
  width: 4px;
  height: 4px;
}

.loading:nth-child(3) {
  animation-delay: 1s;
  width: 4px;
  height: 4px;
  right: -15px;
}

.loading {
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
}

@keyframes loading {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(0px);
  }
  30% {
    transform: translateY(-8px);
  }
  40% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-2px);
  }
  60% {
    transform: translateY(2px);
  }
  80% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
