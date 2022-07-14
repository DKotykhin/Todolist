import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
import task from './taskSlice';

const store = configureStore({
    reducer: { user, task },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;