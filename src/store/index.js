import { configureStore, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const initialState = {
  candidates: {}, // id -> candidate data (finished)
  sessions: {} // in-progress sessions
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    upsertCandidate(state, action) {
      const c = action.payload
      state.candidates[c.id] = c
    },
    saveSession(state, action) {
      const s = action.payload
      state.sessions[s.id] = s
    },
    removeSession(state, action) {
      delete state.sessions[action.payload]
    },
    clearAll(state) {
      state.candidates = {}
      state.sessions = {}
    }
  }
})

export const { upsertCandidate, saveSession, removeSession, clearAll } = appSlice.actions

const persistConfig = { key: 'root', storage }
const persisted = persistReducer(persistConfig, appSlice.reducer)

export const store = configureStore({
  reducer: persisted
})

export const persistor = persistStore(store)
