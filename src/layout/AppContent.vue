<template>
  <div>
    <b-container class="my-4 d-lg-none d-xl-none">
      <b-row>
        <b-col class="text-right">
          <i class="fas fa-wallet"></i>Funds:
          <strong>{{ funds | currency }}</strong>
        </b-col>
      </b-row>
    </b-container>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { portfolio, global } from "@modules";

@Component
export default class AppContent extends Vue {
  prevHeight = 0;

  get show() {
    return global.isLoading;
  }

  get funds() {
    return portfolio.funds;
  }

  beforeLeave(element: HTMLElement) {
    this.prevHeight = +getComputedStyle(element).height;
  }

  enter(element: HTMLElement) {
    const { height } = getComputedStyle(element);

    element.style.height = this.prevHeight.toString();

    setTimeout(() => {
      element.style.height = height;
    });
  }

  afterEnter(element: HTMLElement) {
    element.style.height = "auto";
  }
}
</script>

<style scoped>
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
