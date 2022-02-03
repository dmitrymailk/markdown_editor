import { createStore } from "vuex";

const store = createStore({
  state: {
    editorText: "",
    currentFile: "test.md",
  },
  mutations: {
    setEditorText(state, payload) {
      state.editorText = payload.newText;
    },
  },
  actions: {},
  modules: {},
  getters: {},
});

export { store };
