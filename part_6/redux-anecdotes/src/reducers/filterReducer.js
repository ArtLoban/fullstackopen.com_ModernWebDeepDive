import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      console.log('changeFilter state: ', JSON.parse(JSON.stringify(state)))

      return action.payload
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer