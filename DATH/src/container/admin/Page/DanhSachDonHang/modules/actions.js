import * as ActionType from "./constants";
import axios from "axios";

export const actDanhSachDonHangRequest = () => {
    return {
        type: ActionType.DANH_SACH_DON_HANG_REQUEST,
    };
};

export const actDanhSachDonHangSuccess = (data) => {
    console.log(data.data);
    return {
        type: ActionType.DANH_SACH_DON_HANG_SUCCESS,
        payload: data.data,
    };
};

export const actDanhSachDonHangFail = (data) => {
    return {
        type: ActionType.DANH_SACH_DON_HANG_FAIL,
        payload: data.data,
    };
};

export const actFetchDanhSachDonHang = () => {
    //Gọi axios trong action
    return (dispatch) => {
        dispatch(actDanhSachDonHangRequest());
        axios({
            url: "http://localhost:5000/read-list-order",
            method: "GET",
        })
            .then((result) => {
                //Success
                dispatch(actDanhSachDonHangSuccess(result.data));
            })
            .catch((err) => {
                //Fail
                dispatch(actDanhSachDonHangFail(err));
            })
    }
}

export const actSearch = (keyword) => {
    return {
        type: ActionType.SEARCH,
        payload: keyword,
    }
}

export const actEdit = (donHang) => {
    return {
        type: ActionType.EDIT,
        payload: donHang,
    }
}

export const actSubmit = (donHang) => {
    return {
        type: ActionType.SUBMIT,
        payload: donHang,
    }
    
}

export const actLoiNhuanRequest = () => {
    return {
        type: ActionType.LOI_NHUAN_REQUEST,
    };
};

export const actLoiNhuanSuccess = (data) => {
    // console.log(data.data.revenue);
    return {
        type: ActionType.LOI_NHUAN_SUCCESS,
        payload: data.data,
    };
};

export const actLoiNhuanFail = (data) => {
    return {
        type: ActionType.DANH_SACH_DON_HANG_FAIL,
        payload: data,
    };
};

export const actFetchLoiNhuan= () => {
    //Gọi axios trong action
    return (dispatch) => {
        dispatch(actLoiNhuanRequest());
        axios({
            url: "http://localhost:5000/admin-manage-order",
            method: "GET",
        })
            .then((result) => {
                //Success
                dispatch(actLoiNhuanSuccess(result));
            })
            .catch((err) => {
                //Fail
                dispatch(actLoiNhuanFail(err));
            })
    }
}

