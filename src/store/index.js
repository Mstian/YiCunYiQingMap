import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toastShow:false,
    detailShow:false,
    detailData:{},
    maskShow:false,
  },
  mutations: {
    CHANGETOAST(state){
      state.toastShow = !state.toastShow;
    },
    DETAILSHOW(state,payload){
      state.detailShow = !state.detailShow;
      if(payload){
        state.detailData = payload;
      }
    },
    CHANGEMASKSHOW(state){
      state.maskShow = !state.maskShow;
    },
  },
  actions: {
    patch_changetoast(context){
      context.commit('CHANGETOAST');
     
    },
    patch_change_detail(context,payload){
      context.commit('DETAILSHOW',payload);
    },
    patch_change_mask(context){
      context.commit('CHANGEMASKSHOW');
    }
  },
  modules: {
  }
})
