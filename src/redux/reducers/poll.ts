import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { RequestStatus } from "../../interfaces";
import { NavigateFunction } from "react-router-dom";

interface InitialState {
  status: RequestStatus;
}

const initialState: InitialState = {
  status: "nothing",
};

const PollSlice = createSlice({
  name: "Poll",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
  },
});

export const { setStatus } = PollSlice.actions;

// export const RegisterAsync =
//   (req: RegisterReq, navigate: NavigateFunction): AppThunk =>
//   async (dispatch) => {
//     dispatch(setStatus("loading"));

//     try {
//       // const { data } = await axios.post<ApiResponse>(regiserRoutes, req);
//       // if (data.status) {
//       //   dispatch(setStatus("data"));
//       //   enqueueSnackbar(data.msg, {
//       //     variant: "success",
//       //   });
//       //   navigate(ROOT);
//       // }
//       // if (!data.status) {
//       //   console.log("false");
//       //   enqueueSnackbar(data.msg, {
//       //     variant: "error",
//       //   });
//       // }
//     } catch (error: any) {
//       dispatch(setStatus("error"));
//     }
//   };

// export const LoginAsync =
//   (req: LoginReq, navigate: NavigateFunction): AppThunk =>
//   async (dispatch) => {
//     dispatch(setStatus("loading"));
//     const { AUTH, ROOT } = ROUTES;
//     try {
//       const { data } = await axios.post<ApiResponse>(loginRoutes, req);

//       if (data.status) {
//         dispatch(setStatus("data"));
//         dispatch(setUser(data.user));
//         dispatch(setIsAuth(data.user.isOnline));
//         sessionStorage.setItem("chat-app-user", JSON.stringify(data.user));
//         navigate(AUTH.HOME);
//       }
//       if (!data.status) {
//         navigate(ROOT);
//         enqueueSnackbar(data.msg, {
//           variant: "error",
//         });
//       }
//     } catch (error: any) {
//       dispatch(setStatus("error"));
//     }
//   };

// export const LogOutAsync =
//   (req: LogOutReq, navigate: NavigateFunction): AppThunk =>
//   async (dispatch) => {
//     dispatch(setStatus("loading"));
//     const { ROOT } = ROUTES;
//     try {
//       const { data } = await axios.post<ApiResponse>(logOutRoutes, req);
//       console.log(data);

//       if (data.status) {
//         dispatch(setStatus("data"));
//         dispatch(setUser(data.user));
//         dispatch(setIsAuth(data.user.isOnline));
//         sessionStorage.removeItem("chat-app-user");
//         navigate(ROOT);
//       }
//       if (!data.status) {
//         navigate(ROOT);
//         enqueueSnackbar(data.msg, {
//           variant: "error",
//         });
//       }
//     } catch (error: any) {
//       dispatch(setStatus("error"));
//     }
//   };

export default PollSlice;
