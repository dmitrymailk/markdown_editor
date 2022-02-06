import { createStore } from "vuex";

const store = createStore({
  state: {
    editorText: "",
    currentFilename: "Untitled file",
    prevFilename: "",
    filenameRef: "",
    editor: "",
    editorContext: "",
    isEditorOpen: false,
  },
  mutations: {
    setEditorText(state, payload) {
      const text = payload.editorText;
      state.editorText = text;
      console.log("setEditorText");
    },
    setCurrentFilename(state, payload) {
      state.currentFilename = payload;
      localStorage.currentFilename = payload;
    },
    setPrevFilename(state, payload) {
      state.prevFilename = payload;
    },
    setFileNameRef(state, payload) {
      state.filenameRef = payload;
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
    getCurrentFilename(state, getters) {
      return state.currentFilename;
    },
  },
});

export { store };
