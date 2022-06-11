import { createAction } from "@reduxjs/toolkit";
import { ActionType } from "../constants";

const data = [
    {
        id: "1",
        name: 'Cà phê 1',
        category: "1",
        image: 'http://vanchuyenchomeo.com/wp-content/uploads/2020/03/cach-nuoi-cho-con-2-thang-tuoi.jpg',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn.',
        number: 1,
        weight: 10,
        status: true
    },
    {
        id: "2",
        name: 'Cà phê 2',
        category: "1",
        image: 'http://vanchuyenchomeo.com/wp-content/uploads/2020/03/cach-nuoi-cho-con-2-thang-tuoi.jpg',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn.',
        number: 1,
        weight: 10,
        status: false
    },
    {
        id: "3",
        name: 'Cà phê 3',
        category: "1",
        image: 'http://vanchuyenchomeo.com/wp-content/uploads/2020/03/cach-nuoi-cho-con-2-thang-tuoi.jpg',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn.',
        number: 1,
        weight: 10,
        status: true
    },
    {
        id: "4",
        name: 'Cà phê 4',
        category: "1",
        image: 'http://vanchuyenchomeo.com/wp-content/uploads/2020/03/cach-nuoi-cho-con-2-thang-tuoi.jpg',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn.',
        number: 1,
        weight: 10,
        status: false
    }
];

export const fetchProductAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 2000);
    });
}
export const addProductAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(payload), 100);
    });
}
export const updateProductAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(payload), 100);
    });
}
export const removeProductAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(payload), 100);
    })
}
export const fetchProductRequest = createAction(ActionType.FETCH_PRODUCT_REQUEST, function prepare(payload: any) { return { payload } });

export const addProductRequest = createAction(ActionType.ADD_PRODUCT_REQUEST, function prepare(payload: any) { return { payload } });

export const updateProductRequest = createAction(ActionType.UPDATE_PRODUCT_REQUEST, function prepare(payload: any) { return { payload } });

export const removeProductRequest = createAction(ActionType.REMOVE_PRODUCT_REQUEST, function prepare(payload: any) { return { payload } });

export const fetchProductSuccess = createAction(ActionType.FETCH_PRODUCT_SUCCESS, function prepare(payload: any) { return { payload } });

export const addProductSuccess = createAction(ActionType.ADD_PRODUCT_SUCCESS, function prepare(payload: any) { return { payload } });

export const updateProductSuccess = createAction(ActionType.UPDATE_PRODUCT_SUCCESS, function prepare(payload: any) { return { payload } });

export const removeProductSuccess = createAction(ActionType.REMOVE_PRODUCT_SUCCESS, function prepare(payload: any) { return { payload } });