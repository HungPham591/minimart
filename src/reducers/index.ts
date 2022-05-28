import { LayoutReducer } from './LayoutReducer';
import { SettingReducer } from './SettingReducer';
import { ProfileReducer } from './ProfileReducer';
import { ProductReducer } from './ProductReducer';
import { CategoryReducer } from './CategoryReducer';
import { combineReducers } from "redux";

const reducer = combineReducers({
    category: CategoryReducer.reducer,
    profile: ProfileReducer.reducer,
    product: ProductReducer.reducer,
    setting: SettingReducer.reducer,
    layout: LayoutReducer.reducer
});

export default reducer;