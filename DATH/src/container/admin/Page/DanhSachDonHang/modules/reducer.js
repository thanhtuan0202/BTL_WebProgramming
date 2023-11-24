import * as ActionType from "./constants";
import axios from "axios";

let initialState = {
    loading: false,
    data: null,
    error: null,
    keyword: "",
    donHangEdit: null,
    soLuongDonHang: null,
    doanhThu: null,
    loiNhuan: null
}

const danhSachDonHangReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionType.DANH_SACH_DON_HANG_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null;
            return {...state};

        case ActionType.DANH_SACH_DON_HANG_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return {...state};

        case ActionType.DANH_SACH_DON_HANG_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return {...state};

        case ActionType.SEARCH: {
            state.keyword = action.payload;
            return {...state};
        }

        case ActionType.EDIT: {
            state.donHangEdit = action.payload;
            return {...state};
        }

        case ActionType.SUBMIT: {
            console.log(action.payload)
            return axios({
                url:`http://localhost:5000/update-order`,
                method:"POST",
                data: action.payload,

            })
                .then((r) => {
                    // return axios({
                    //     url: "https://60e9fcc55dd7ff0017b3972e.mockapi.io/hang16",
                    //     method: "GET",
                    // })
                    //     .then((r) => {
                    //         state.data = r.data;
                    //         window.location.reload();
                    //         return {...state};

                    //     })
                    //     .catch()
                    window.location.reload();
                    
                })
                .catch(error => {
                    console.log(error);
                    // handle error
                }); 
            
        } 
        
        case ActionType.LOI_NHUAN_SUCCESS: {
            // console.log(action.payload.revenue)
            state.doanhThu = action.payload.revenue[0].DoanhThu;
            state.soLuongDonHang = action.payload.countOrder[0].soLuongDonHang;
            state.loiNhuan = action.payload.profit[0].LoiNhuan;
        
            return {...state};
        }

        default:
            return {...state};
    }
}


export default danhSachDonHangReducer;