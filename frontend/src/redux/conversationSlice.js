import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  conversations: [],
  currentConversation: null,
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload
    },
  },
})

export const { setConversations, setCurrentConversation } = conversationSlice.actions
export default conversationSlice.reducer
