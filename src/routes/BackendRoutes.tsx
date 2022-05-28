import { ListAlt, ShoppingCart } from "@mui/icons-material";
import React from "react";

const BackendRoutes = {
    PRODUCT: {
        label: 'Sản phẩm',
        icon: <ShoppingCart />,
        path: '/',
    },
    CATEGORY: {
        label: 'Danh mục',
        icon: <ListAlt />,
        path: '/category',
    },
}
export default BackendRoutes;