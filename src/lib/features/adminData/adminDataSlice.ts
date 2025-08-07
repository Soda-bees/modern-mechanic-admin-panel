import { RootState } from '@/lib/store';
import { handleComplaints, handleGetAllUser, handleGetAllWorkshop, handleGetSummary, handleQueries, handleScanResult } from '@/services/api';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

export const fetchAllAdminData = createAsyncThunk<
    GetAllSummaryResponse,
    void,
    { rejectValue: string }>(
        'adminData/fetchAll',
        async (_, { rejectWithValue }) => {
            try {
                const response = await handleGetSummary()
                return response?.data as GetAllSummaryResponse;
            } catch (error) {
                if (error instanceof Error) {
                    return rejectWithValue(error.message);
                }
                return rejectWithValue("Something went wrong");
            }
        }
    );


export function createFetchThunk<T, R>(
    name: string,
    apiFn: () => Promise<R>,
    selector: (response: R) => T[]
) {
    return createAsyncThunk(
        `adminData/fetch${name}`,
        async (_, { rejectWithValue }) => {
            try {
                const response = await apiFn();
                return selector(response);
            } catch (error) {
                if (error instanceof Error) {
                    return rejectWithValue(error.message);
                }
                return rejectWithValue("Something went wrong");
            }
        }
    );
}

interface ResourceState<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

interface AdminDataState {
    users: ResourceState<User>;
    scans: ResourceState<Scan>;
    complaints: ResourceState<Complaint>;
    workshops: ResourceState<IWorkshop>;
    queries: ResourceState<Queries>;
}

const initialState: AdminDataState = {
    users: { data: [], loading: false, error: null },
    scans: { data: [], loading: false, error: null },
    complaints: { data: [], loading: false, error: null },
    workshops: { data: [], loading: false, error: null },
    queries: { data: [], loading: false, error: null },
};


export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {
        clearAdminData: (state) => {
            console.log("clear admin data redux");
            state.users = { data: [], loading: false, error: null };
            state.scans = { data: [], loading: false, error: null };
            state.complaints = { data: [], loading: false, error: null };
            state.workshops = { data: [], loading: false, error: null };
            state.queries = { data: [], loading: false, error: null };
        },
        deleteWorkshopRedux: (state, action) => {
            const { id } = action.payload;
            state.workshops.data = state.workshops.data.filter(
                (workshop: IWorkshop) => workshop.id !== id
            );
        },
        editWorkshopRedux: (state, action) => {
            const { workshop } = action.payload
            state.workshops.data = state.workshops.data.map((item: IWorkshop) =>
                item.id === workshop.id ? workshop : item
            )
        },
        addNewWorkshopRedux: (state, action) => {
            const { workshop } = action.payload
            state.workshops.data.push(workshop)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAdminData.pending, (state) => {
                state.users.loading = true;
                state.scans.loading = true;
                state.complaints.loading = true;
                state.workshops.loading = true;
                state.queries.loading = true;

                state.users.error = null;
                state.scans.error = null;
                state.complaints.error = null;
                state.workshops.error = null;
                state.queries.error = null;
            })
            .addCase(fetchAllAdminData.fulfilled, (state, action) => {
                console.log("action.payload redux ====>", action.payload);

                state.users.data = action.payload?.total_users || [];
                state.scans.data = action.payload?.total_scans || [];
                state.complaints.data = action.payload?.total_complaints || [];
                state.workshops.data = action.payload?.total_workshops || [];
                state.queries.data = action.payload?.total_queries || [];

                state.users.loading = false;
                state.scans.loading = false;
                state.complaints.loading = false;
                state.workshops.loading = false;
                state.queries.loading = false;

            })
            .addCase(fetchAllAdminData.rejected, (state, action) => {
                state.users.loading = false;
                state.scans.loading = false;
                state.complaints.loading = false;
                state.workshops.loading = false;
                state.queries.loading = false;

                const errorMessage = action.payload ?? "Something went wrong";
                state.users.error = errorMessage;
                state.scans.error = errorMessage;
                state.complaints.error = errorMessage;
                state.workshops.error = errorMessage;
                state.queries.error = errorMessage;
            });
        adminThunks.forEach(({ key, thunk }) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state[key].loading = true;
                    state[key].error = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state[key].loading = false;
                    state[key].data = action.payload;
                })
                .addCase(thunk.rejected, (state, action) => {
                    const errorMessage = "Something went wrong";
                    state[key].loading = false;
                    state[key].error = errorMessage
                });
        });
    },
});

export const selectUsers = (state: RootState) => state.adminData.users.data;
export const selectScans = (state: RootState) => state.adminData.scans.data;
export const selectComplaints = (state: RootState) => state.adminData.complaints.data;
export const selectWorkshops = (state: RootState) => state.adminData.workshops.data;
export const selectQueries = (state: RootState) => state.adminData.queries.data;

export const selectAdminData = createSelector(
    [
        (state: RootState) => state.adminData.users.data,
        (state: RootState) => state.adminData.scans.data,
        (state: RootState) => state.adminData.complaints.data,
        (state: RootState) => state.adminData.workshops.data,
        (state: RootState) => state.adminData.queries.data,
    ],
    (users, scans, complaints, workshops, queries) => ({
        users, scans, complaints, workshops, queries,
    })
);

export const selectLoadings = createSelector([
    (state: RootState) => state.adminData.users.loading,
    (state: RootState) => state.adminData.scans.loading,
    (state: RootState) => state.adminData.complaints.loading,
    (state: RootState) => state.adminData.workshops.loading,
    (state: RootState) => state.adminData.queries.loading,
], (loadingUser, loadingScan, loadingComplaint, loadingWorkshop, loadingQuery) => ({
    loadingUser, loadingScan, loadingComplaint, loadingWorkshop, loadingQuery
}))

export const fetchUsers = createFetchThunk<User, GetAllUserResponse>('Users', handleGetAllUser, (res) => res.data);
export const fetchScans = createFetchThunk<Scan, GetAllScanResponse>('scans', handleScanResult, (res) => res.data);
export const fetchComplaints = createFetchThunk<Complaint, GetAllComplaintsResponse>('Complaints', handleComplaints, (res) => res.data);
export const fetchWorkshops = createFetchThunk<IWorkshop, getAllWorkshopResponse>('Workshops', handleGetAllWorkshop, (res) => res.data);
export const fetchQueries = createFetchThunk<Queries, GetQueriesResponse>('Queries', handleQueries, (res) => res.queries);

type AdminKeys = keyof AdminDataState;

// const adminThunks: { key: AdminKeys; thunk: any }[] = [
//     { key: 'users', thunk: fetchUsers },
//     { key: 'scans', thunk: fetchScans },
//     { key: 'complaints', thunk: fetchComplaints },
//     { key: 'workshops', thunk: fetchWorkshops },
//     { key: 'queries', thunk: fetchQueries },
// ];

const adminThunks: {
    key: AdminKeys;
    thunk:
    | typeof fetchUsers
    | typeof fetchScans
    | typeof fetchComplaints
    | typeof fetchWorkshops
    | typeof fetchQueries;
}[] = [
        { key: 'users', thunk: fetchUsers },
        { key: 'scans', thunk: fetchScans },
        { key: 'complaints', thunk: fetchComplaints },
        { key: 'workshops', thunk: fetchWorkshops },
        { key: 'queries', thunk: fetchQueries },
    ];

export const { clearAdminData, deleteWorkshopRedux, editWorkshopRedux, addNewWorkshopRedux } = adminDataSlice.actions;
export default adminDataSlice.reducer;
