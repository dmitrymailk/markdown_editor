import { createStore } from "vuex";

const store = createStore({
  state: {
    editorText: "",
    currentFilename: "test1.md",
  },
  mutations: {
    setEditorText(state, payload) {
      state.editorText = payload.newText;
    },
    setCurrentFilename(state, payload) {
      state.currentFilename = payload.filename;
    },
  },
  actions: {},
  modules: {},
  getters: {
    currentFilename(state) {
      return state.currentFilename;
    },
  },
});

export { store };
