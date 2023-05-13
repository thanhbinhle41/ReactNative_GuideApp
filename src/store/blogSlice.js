import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    listBlog: [],
    listMyBlog: []
  },
  reducers: {
    setBlog: (state, action) => {
      state.listBlog = action.payload;
    },
    setMyBlog: (state, action) => {
      state.listMyBlog = action.payload;
    },
    addBlog: (state, action) => {
      state.listBlog.push(action.payload);
      state.listMyBlog.push(action.payload);
    },
    removeBlog: (state, action) => {
      const index = state.listBlog.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.listBlog.splice(index, 1);
      }
      const index2 = state.listMyBlog.findIndex(item => item.id === action.payload.id);
      if (index2 !== -1) {
        state.listBlog.splice(index2, 1);
      }
    },
    updateBlog: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.listBlog.findIndex(item => item.id === id);
      if (index !== -1) {
        state.listBlog[index] = { ...state.listBlog[index], ...updatedItem };
      }
      const index2 = state.listMyBlog.findIndex(item => item.id === id);
      if (index2 !== -1) {
        state.listMyBlog[index2] = { ...state.listMyBlog[index2], ...updatedItem };
      }
    }
  },
  extraReducers: (builder) => { },
});

export default blogSlice;

export const blogSliceActions = blogSlice.actions;

export const listBlogSelector = (state) => state.blog.listBlog;
export const listMyBlogSelector = (state) => state.blog.listMyBlog;
