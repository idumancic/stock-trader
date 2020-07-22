<template>
  <b-container class="p-4 my-4 bg-light rounded shadow">
    <b-overlay :show="show" rounded="sm">
      <transition
        name="fade"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view></router-view>
      </transition>
    </b-overlay>
  </b-container>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import globalModule from "@/store/modules/global";

@Component
export default class AppContent extends Vue {
  prevHeight = 0;

  get show() {
    return globalModule.isLoading;
  }

  beforeLeave(element) {
    this.prevHeight = getComputedStyle(element).height;
  }

  enter(element) {
    const { height } = getComputedStyle(element);

    element.style.height = this.prevHeight;

    setTimeout(() => {
      element.style.height = height;
    });
  }

  afterEnter(element) {
    element.style.height = "auto";
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
