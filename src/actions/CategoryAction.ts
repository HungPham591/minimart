import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../constants';

const data = [
    {
        id: "1",
        name: 'Cà phê 1',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có.',
    },
    {
        id: "2",
        name: 'Cà phê 2',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    },
    {
        id: "3",
        name: 'Cà phê 3',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    },
    {
        id: "4",
        name: 'Cà phê 4',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    },
    {
        id: "5",
        name: 'Cà phê 5',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    },
    {
        id: "6",
        name: 'Cà phê 6',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    },
    {
        id: "7",
        name: 'Cà phê 7',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    },
    {
        id: "8",
        name: 'Cà phê 8',
        description: 'Việt Nam tự hào sở hữu một di sản văn hóa cà phê giàu có, và  chính là linh hồn, là nét văn hóa thưởng thức cà phê đã ăn sâu vào tiềm thức biết bao người Việt. Cà phê rang xay được chiết xuất chậm rãi từng giọt một thông qua dụng cụ lọc bằng kim loại có tên là.',
    }
];

export const fetchCategoryAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 2000);
    })
}
export const addCategoryAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(payload), 100);
    })
}
export const updateCategoryAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(payload), 100)
    });
}
export const removeCategoryAPI = (payload: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(payload), 100);
    })
}


export const fetchCategoryRequest = createAction(ActionType.FETCH_CATEGORY_REQUEST, function prepare(payload: any) { return { payload } });

export const addCategoryRequest = createAction(ActionType.ADD_CATEGORY_REQUEST, function prepare(payload: any) { return { payload } });

export const updateCategoryRequest = createAction(ActionType.UPDATE_CATEGORY_REQUEST, function prepare(payload: any) { return { payload } });

export const removeCategoryRequest = createAction(ActionType.REMOVE_CATEGORY_REQUEST, function prepare(payload: any) { return { payload } });

export const fetchCategorySuccess = createAction(ActionType.FETCH_CATEGORY_SUCCESS, function prepare(payload: any) { return { payload } });

export const addCategorySuccess = createAction(ActionType.ADD_CATEGORY_SUCCESS, function prepare(payload: any) { return { payload } });

export const updateCategorySuccess = createAction(ActionType.UPDATE_CATEGORY_SUCCESS, function prepare(payload: any) { return { payload } });

export const removeCategorySuccess = createAction(ActionType.REMOVE_CATEGORY_SUCCESS, function prepare(payload: any) { return { payload } });