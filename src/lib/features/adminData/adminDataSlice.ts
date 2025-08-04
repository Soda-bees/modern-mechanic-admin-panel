import { RootState } from '@/lib/store';
import { handleGetAllUser, handleGetSummary } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchAllAdminData = createAsyncThunk(
    'adminData/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await handleGetSummary() as GetAllSummaryResponse
            return response?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

interface AdminDataState {
    users: User[];
    scans: Scan[];
    complaints: Complaint[];
    workshops: IWorkshop[];
    queries: Queries[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminDataState = {
    users: [],
    scans: [],
    complaints: [],
    workshops: [],
    queries: [],
    loading: false,
    error: null,
};

export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {
        clearAdminData: (state) => {
            state.users = [];
            state.scans = [];
            state.complaints = [];
            state.workshops = [];
            state.queries = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAdminData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAdminData.fulfilled, (state, action: PayloadAction<any>) => {
                console.log("fetchAllAdminData.fulfilled" , action.payload);
                // state.loading = false;
                // state.users = action.payload.users;
                // state.scans = action.payload.scans;
                // state.complaints = action.payload.complaints;
                // state.workshops = action.payload.workshops;
                // state.queries = action.payload.queries;
            })
            .addCase(fetchAllAdminData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectUsers = (state: RootState) => state.adminData.users;
export const selectScans = (state: RootState) => state.adminData.scans;
export const selectComplaints = (state: RootState) => state.adminData.complaints;
export const selectWorkshops = (state: RootState) => state.adminData.workshops;
export const selectQueries = (state: RootState) => state.adminData.queries;

export const { clearAdminData } = adminDataSlice.actions;
export default adminDataSlice.reducer;
