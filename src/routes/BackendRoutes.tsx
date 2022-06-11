import { ListAlt, ShoppingCart } from "@mui/icons-material";
import React from "react";

const BackendRoutes = [
    {
        label: 'Sản phẩm',
        icon: <ShoppingCart />,
        path: '/',
    },
    {
        label: 'Danh mục',
        icon: <ListAlt />,
        path: '/category',
    },
]
export default BackendRoutes;