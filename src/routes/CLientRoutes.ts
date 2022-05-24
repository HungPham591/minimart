import CategoryPage from "../containers/Client/CategoryPage";
import ProductPage from "../containers/Client/ProductPage";

const ClientRoutes = {
    CATEGORY: {
        label: 'Danh mục',
        path: '/category',
        component: CategoryPage
    },
    PRODUCT: {
        label: 'Sản phẩm',
        path: '/',
        component: ProductPage,
        exact: true,
    },
}

export default ClientRoutes;