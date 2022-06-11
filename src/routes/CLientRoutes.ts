import CategoryPage from "../containers/CategoryPage";
import ProductPage from "../containers/ProductPage";


const ClientRoutes = [
    {
        label: 'Danh mục',
        path: '/category',
        component: CategoryPage
    },
    {
        label: 'Sản phẩm',
        path: '/',
        component: ProductPage,
        exact: true,
    },
]

export default ClientRoutes;