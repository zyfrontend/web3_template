import { defineStore } from "pinia";
import { Toast } from "vant";

import { connectWeb3 } from "@/web3";
import {
  userLogin,
  information,
  switchLanguage,
  userInfo,
} from "@/request/api";
import { md5, getDate, getQueryString } from "@/utils";

export const RootStore = defineStore("Root", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {},
});
