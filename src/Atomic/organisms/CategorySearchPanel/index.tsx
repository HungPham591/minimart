import { Box, Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { sortCategory } from '../../../reducers/CategoryReducer';
import CustomInput from '../../atoms/SearchInput';
import CustomDropdown from '../../molecules/Dropdown';

const filterItem = [
    {
        value: -1,
        label: 'Mặc định'
    },
    {
        value: 1,
        label: 'Số thứ tự tăng dần'
    },
    {
        value: 2,
        label: 'Số thứ giảm dần'
    },
    {
        value: 3,
        label: 'Sắp xếp tăng dần theo tên'
    },
    {
        value: 4,
        label: 'Sắp xếp giảm dần theo tên'
    },
];
const typeOfSearchItem = [
    {
        value: 1,
        label: "Tìm kiếm theo tên"
    },
    {
        value: 2,
        label: "Tìm kiếm theo id"
    }
];
const formikInitialValue = {
    search: "",
    filter: filterItem[0].value,
    typeOfSearch: typeOfSearchItem[0].value
}


function SearchPanel(props: any) {
    const dispatch = useDispatch();
    const handleSubmit = (data: any) => {
        dispatch(sortCategory(data));
    }
    const formik = useFormik({
        initialValues: formikInitialValue,
        onSubmit: handleSubmit
    })
    return (
        <Paper>
            <Box paddingY="12px">
                <Container>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid spacing={3} container>
                                <Grid item lg={4} md={12} xs={12}>
                                    <CustomInput
                                        label="danh mục sản phẩm"
                                        value={formik.values.search}
                                        name="search"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={3} md={12} xs={12}>
                                    <CustomDropdown
                                        value={formik.values.typeOfSearch}
                                        title="Sắp xếp"
                                        name="typeOfSearch"
                                        data={typeOfSearchItem}
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
                                    <Button
                                        variant="contained"
                                        fullWidth={true}
                                        type="submit"
                                        style={{ height: "100%" }}
                                    >
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