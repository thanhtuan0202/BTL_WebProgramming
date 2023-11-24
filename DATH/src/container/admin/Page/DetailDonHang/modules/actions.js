import * as ActionType from "./constants";
import axios from "axios";

export const actFetchDetailDonHang = (id) => {
    return (dispatch) => {
        dispatch(actDetailDonHangRequest(id));
        console.log({id})
        axios({
            url: `http://localhost:3000/admin-check-order`,
            method: "POST",
            data: {
                "id":id,
            },
        })
            .then((result) => {
                console.log(result.data.orderDetail[0])
                dispatch(actDetailDonHangSuccess(result.data));
            })
            .catch((err) => {
                dispatch(actDetailDonHangFail(err));
            })
    };

}

export const actDetailDonHangRequest = () => {
    return {
        type: ActionType.DETAIL_DONHANG_REQUEST,
    };
};

export const actDetailDonHangSuccess = (data) => {
    return {
        type: ActionType.DETAIL_DONHANG_SUCCESS,
        payload: data,
    };
};

export const actDetailDonHangFail = (data) => {
    return {
        type: ActionType.DETAIL_DONHANG_FAIL,
        payload: data,
    };
};