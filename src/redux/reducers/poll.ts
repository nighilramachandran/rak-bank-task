import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { PollProps, RequestStatus } from "../../interfaces";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface InitialState {
  status: RequestStatus;
  poll: PollProps[];
}

const initialState: InitialState = {
  status: "nothing",
  poll: [],
};

const PollSlice = createSlice({
  name: "Poll",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    AddPoll: (state, { payload }: PayloadAction<PollProps>) => {
      const existingIndex = state.poll.findIndex(
        (poll) => poll.index === payload.index
      );
      if (existingIndex !== -1) {
        state.poll[existingIndex] = payload;
      } else {
        state.poll.push(payload);
      }
    },
  },
});

export const { setStatus, AddPoll } = PollSlice.actions;

export const SubmitPollAsync =
  (req: PollProps[]): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        req
      );

      if (response.status === 201) {
        dispatch(setStatus("data"));
        enqueueSnackbar("success", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      }
    } catch (error: any) {
      dispatch(setStatus("error"));
    }
  };
export default PollSlice;
