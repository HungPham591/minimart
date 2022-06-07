import { Box, Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { sortProduct } from '../../../reducers/ProductReducer';
import CustomInput from '../../atoms/SearchInput';
import CustomDropdown from '../../molecules/Dropdown';

const filterItem = [
    {
        value: -1,
        label: 'Mặc định'
    },
    {
        value: 1,
        label: 'Thứ tự tăng dần'
    },
    {
        value: 2,
        label: 'Thứ giảm dần'
    },
    {
        value: 3,
        label: 'Tăng dần theo tên'
    },
    {
        value: 4,
        label: 'Giảm dần theo tên'
    },
    {
        value: 5,
        label: 'Tăng dần theo số lượng'
    },
    {
        value: 6,
        label: 'Giảm dần theo số lượng'
    },
];
const typeOfSearchItem = [
    {
        value: 1,
        label: "Theo tên"
    },
    {
        value: 2,
        label: "Theo id"
    }
];


function SearchPanel(props: any) {
    const dispatch = useDispatch();
    const { data: dataCategory } = useSelector(selectCategory);

    const categoryItem = [{ value: -1, label: 'Mặc định' }];

    dataCategory.forEach((item: any) => categoryItem.push({ value: item?.id, label: item?.name }));

    const handleSubmit = (data: any) => {
        dispatch(sortProduct(data));
    }
    const formik = useFormik({
        initialValues: {
            search: "",
            category: -1,
            typeOfSearch: typeOfSearchItem[0]?.value,
            filter: filterItem[0]?.value
        },
        onSubmit: handleSubmit,
        enableReinitialize: true
    });
    return (
        <Paper>
            <Box paddingY="12px">
                <Container>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid spacing={3} container>
                                <Grid item lg={3} md={12} xs={12}>
                                    <CustomInput
                                        label="sản phẩm"
                                        value={formik.values.search}
                                        name="search"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={2} md={12} xs={12}>
                                    <CustomDropdown
                                        value={formik.values.typeOfSearch}
                                        title="Tìm kiếm theo"
                                        name="typeOfSearch"
                                        data={typeOfSearchItem}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={2} md={12} xs={12}>
                                    <CustomDropdown
                                        value={formik.values.category}
                                        title="Danh mục"
                                        name="category"
                                        data={categoryItem}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={3} md={12} xs={12}>
                                    <CustomDropdown
                                        value={formik.values.filter}
                                        title="Sắp xếp"
                                        name="filter"
                                        data={filterItem}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={2} md={12} xs={12}>
                                    <Button variant="contained" fullWidth={true} type="submit" style={{ height: "100%" }}>
                                        TÌM KIẾM
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </FormikProvider>
                </Container>
            </Box>
        </Paper>
    );
}

export default React.memo(SearchPanel);