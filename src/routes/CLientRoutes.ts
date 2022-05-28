import CategoryPage from "../containers/CategoryPage";
import ProductPage from "../containers/ProductPage";


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