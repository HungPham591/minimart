import { LayoutReducer } from './layout.reducer';
import { SettingReducer } from './setting.reducer';
import { ProfileReducer } from './profile.reducer';
import { ProductReducer } from './product.reducer';
import { CategoryReducer } from './category.reducer';
import { combineReducers } from "redux";

const reducer = combineReducers({
    category: CategoryReducer.reducer,
    profile: ProfileReducer.reducer,
    product: ProductReducer.reducer,
    setting: SettingReducer.reducer,
    layout: LayoutReducer.reducer
});

export default reducer;