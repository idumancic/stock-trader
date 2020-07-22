import { RootState } from "@/store/index";
import { getStoreBuilder } from "vuex-typex";
import { GlobalState } from "./types";

const initialState: GlobalState = {
  isLoading: false
};

const module = getStoreBuilder<RootState>().module("global", initialState);

const getters = {
  isLoading: module.read(state => state.isLoading, "isLoading")
};

const mutations = {
  setIsLoading(state: GlobalState, payload: boolean) {
    state.isLoading = payload;
  }
};

const global = {
  get state() {
    return module.state();
  },

  get isLoading() {
    return getters.isLoading();
  },

  commitSetIsLoading: module.commit(mutations.setIsLoading)
};

export default global;
