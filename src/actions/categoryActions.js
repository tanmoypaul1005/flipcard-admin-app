
import axios from "axios";
import axiosIntance from "../Helpers/axios"
import { categoryConstants } from './constants';
 const getAllCategory=()=>{
    return async dispatch=>{
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST})
        const res=await axiosIntance.get(`category/getCategory`);
        console.log(res);


        if(res.status===200){
            const{categoryList}=res.data;
            dispatch({type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload:{categories:categoryList}
            });
        }else{
            dispatch({type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{error:res.data.error}
            });
        }
    }
}

export const addCategory=(form)=>{
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
       
            const res = await axiosIntance.post(`category/create`, form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
            } else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
    }
}




export const updateCategories=(form)=>{
    return async dispatch => {
        dispatch({type: categoryConstants.UPDATE_CATEGORIES_REQUEST});
            const res = await axiosIntance.post(`/category/update`, form);
            if (res.status === 201) {
             dispatch({type: categoryConstants.UPDATE_CATEGORIES_SUCCESS});  
              dispatch(getAllCategory());
            } else {
            const { error } = res.data;
            dispatch({type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
            payload: { error }
            })
            }
    }
}

export const deleteCategoriesAction=(ids)=>{
    return async dispatch => {
        dispatch({type:categoryConstants.DELETE_CATEGORIES_REQUEST})
            const res = await axiosIntance.post(`/category/delete`, {
                payload:{ids}
            });
            if(res.status === 2001){
                dispatch(getAllCategory());
                dispatch({type:categoryConstants.DELETE_CATEGORIES_SUCCESS});
            }
            else{
                const {error}= res.data;
                dispatch({type:categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error}    
                })
            }
            console.log(res);
    }
}

export {
    getAllCategory
}