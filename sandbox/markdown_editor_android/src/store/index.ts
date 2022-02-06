import { createStore } from "vuex";

const store = createStore({
  state: {
    editorText: "",
    currentFilename: "test1.md",
    editor: "",
    editorContext: "",
    isEditorOpen: false,
  },
  mutations: {
    setEditorText(state, payload) {
      const text = payload.editorText;
      state.editorText = text;
      console.log(state.editor);
    },
    setCurrentFilename(state, payload) {
      state.currentFilename = payload.filename;
    },
    setEditorContext(state, payload) {
      const ctx = payload.editorContext;
      state.editorContext = ctx;
    },
    setEditor(state, payload) {
      state.editor = payload;
    },
    setEditorOpen(state, payload) {
      state.isEditorOpen = payload;
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
