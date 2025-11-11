import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import masterService from '../../service/master.service'

export const fetchAllDropdown = createAsyncThunk(
  'dropdown/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await masterService.allDrodown()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)



const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDropdown.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllDropdown.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchAllDropdown.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default dropdownSlice.reducer
