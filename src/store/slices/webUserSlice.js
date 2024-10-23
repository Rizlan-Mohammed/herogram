import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { webUserService } from "services/WebUserService";

export const initialState = {
  loading: false,
  data: "",
  error: "",
};

export const WebUserCreate = createAsyncThunk(
  "WebUser/create",
  async (data) => {
    try {
      const response = await webUserService.create(data);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserGetAll = createAsyncThunk(
  "WebUser/getAll",
  async () => {
    try {
      const response = await webUserService.getAll();
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserGetUnique = createAsyncThunk(
  "WebUser/getUnique",
  async (id) => {
    try {
      const response = await webUserService.getUnique(id);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserUpdate = createAsyncThunk(
  "WebUser/update",
  async (data) => {
    try {
      const response = await webUserService.update(data);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserDelete = createAsyncThunk(
  "WebUser/delete",
  async (id) => {
    try {
      const response = await webUserService.delete_(id);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserNotificationAdd = createAsyncThunk(
  "WebUser/notification/add",
  async (data) => {
    try {
      const response = await webUserService.notificationAdd(data);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserNotificationGetUnique = createAsyncThunk(
  "WebUser/notification/getUnique",
  async (id) => {
    try {
      const response = await webUserService.notificationGetUnique(id);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserNotificationUpdate = createAsyncThunk(
  "WebUser/notification/update",
  async (userId, location) => {
    try {
      const response = await webUserService.notificationUpdate(userId, location);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const WebUserNotificationDelete = createAsyncThunk(
  "WebUser/notification/delete",
  async (userId, locationId) => {
    try {
      const response = await webUserService.notificationDelete_(userId, locationId);
      return response?.data;
    } catch (err) {
      return err;
    }
  }
);

export const webUserSlice = createSlice({
  name: "webUser",
  initialState,
  reducers: {
    // authenticated: (state, action) => {
    // 	state.loading = false
    // 	state.redirect = '/'
    // 	state.token = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder
      //------This is create-------
      .addCase(WebUserCreate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserCreate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //------This is getAll-------
      .addCase(WebUserGetAll.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserGetAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserGetAll.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //------This is getUnique-------
      .addCase(WebUserGetUnique.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserGetUnique.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserGetUnique.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //-----------This is update------------
      .addCase(WebUserUpdate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserUpdate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //-----------This is Delete------------
      .addCase(WebUserDelete.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserDelete.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //-----------This is Notification Add------------
      .addCase(WebUserNotificationAdd.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserNotificationAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserNotificationAdd.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //-----------This is Location getUnique------------
      .addCase(WebUserNotificationGetUnique.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserNotificationGetUnique.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserNotificationGetUnique.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //-----------This is Location update------------
      .addCase(WebUserNotificationUpdate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserNotificationUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserNotificationUpdate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
       //-----------This is Location dalete------------
       .addCase(WebUserNotificationDelete.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(WebUserNotificationDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(WebUserNotificationDelete.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

// export const {
// 	authenticated,
// 	showAuthMessage,
// } = vehicleSpecificationSlice.actions

export default webUserSlice.reducer;
