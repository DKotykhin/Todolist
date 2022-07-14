import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskdata: [],
};

const TasksSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createTasks: (state, action) => {
            state.taskdata = action.payload;
        },
        addTask: (state, action) => {
            state.taskdata = [...state.taskdata, action.payload];
        },
        removeTask: (state, action) => {
            const newTasks = state.taskdata.filter(
                (task) => task._id !== action.payload
            );
            state.taskdata = newTasks;
        },
        updateTaskCompleted: (state, action) => {
            state.taskdata.forEach((item) => {
                if (item._id === action.payload) {
                    item.completed = !item.completed
                }
            });
        },
        updateTaskAll: (state, action) => {
            state.taskdata.forEach((item) => {
                if (item._id === action.payload._id) {
                    item.description = action.payload.description
                    item.completed = action.payload.completed
                }
            });
        },
    },

});

const { actions, reducer } = TasksSlice;

export default reducer;
export const {
    createTasks,
    addTask,
    removeTask,
    updateTaskCompleted,
    updateTaskAll
} = actions;