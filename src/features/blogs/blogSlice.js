import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  blog: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchBlogs.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(FetchBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(FetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(FetchBlog.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(FetchBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blog = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder
      .addCase(FetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(AddBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(AddBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = [action.payload, ...state.blogs];
        state.isError = false;
        state.message = "";
      })
      .addCase(AddBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(RemoveBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(RemoveBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id,
        );
        state.isError = false;
        state.message = "";
      })
      .addCase(RemoveBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UpdateBlog.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(UpdateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Blog Updated!";

        // Update the blog currently being viewed
        state.blog = action.payload;

        // Update the same blog inside the feed list
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog,
        );
      })
      .addCase(UpdateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
/*
//Fetch all blogs
export const FetchBlogs = createAsyncThunk(
  "FETCH_BLOGS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/blogs");

      return Array.isArray(response.data) ? response.data.reverse() : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs",
      );
    }
  },
);*/

export const FetchBlogs = createAsyncThunk(
  "FETCH_BLOGS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/blogs");

      return Array.isArray(response.data) ? response.data.reverse() : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Failed to fetch blogs",
      );
    }
  },
);

// Fetch Blog
export const FetchBlog = createAsyncThunk("FETCH_BLOG", async (_id) => {
  try {
    const response = await axios.get("/api/blogs/" + _id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//ADD Blog
export const AddBlog = createAsyncThunk(
  "ADD_BLOG",
  async (formData, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const token = user?.token;

    if (!token) {
      return thunkAPI.rejectWithValue(
        "Authentication required. Please log in.",
      );
    }

    try {
      let options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post("/api/blogs", formData, options);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

//remove blog
export const RemoveBlog = createAsyncThunk(
  "REMOVE_BLOG",
  async (id, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const token = user?.token;

    if (!token) {
      return thunkAPI.rejectWithValue(
        "Authentication required. Please log in.",
      );
    }

    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/blogs/${id}`, options);

      return { _id: id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to delete blog.",
      );
    }
  },
);

// Update blog
export const UpdateBlog = createAsyncThunk(
  "UPDATE_BLOG",
  async ({ id, title, description, author }, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const token = user?.token;

    if (!token) {
      return thunkAPI.rejectWithValue(
        "Authentication required. Please log in.",
      );
    }

    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `/api/blogs/${id}`,
        {
          title,
          description,
          author,
        },
        options,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Failed to update blog.",
      );
    }
  },
);
