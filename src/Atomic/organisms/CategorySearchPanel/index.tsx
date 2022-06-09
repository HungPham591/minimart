import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { sortCategory } from '../../../reducers/CategoryReducer';
import CustomDropdown from '../../molecules/Dropdown';
import CustomTextInput from '../../molecules/TextInput';

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
const defaultValues = {
    search: "",
    filter: filterItem[0].value,
    typeOfSearch: typeOfSearchItem[0].value
}


function SearchPanel(props: any) {
    const dispatch = useDispatch();
    const onSubmit = (data: any) => {
        dispatch(sortCategory(data));
    }

    const { handleSubmit, control } = useForm({ defaultValues });

    return (
        <Paper>
            <Box paddingY="12px">
                <Container>
                    <Grid spacing={3} container>
                        <Grid item lg={4} md={12} xs={12}>
                            <CustomTextInput
                                name="search"
                                control={control}
                                label="danh mục sản phẩm"
                                InputProps={{
                                    endAdornment: <SearchOutlined />
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={12} xs={12}>
                            <CustomDropdown
                                title="Sắp xếp"
                                name="typeOfSearch"
                                data={typeOfSearchItem}
                                control={control}
                            />
                        </Grid>
                        <Grid item lg={3} md={12} xs={12}>
                            <CustomDropdown
                                title="Sắp xếp"
                                name="filter"
                                data={filterItem}
                                control={control}
                            />
                        </Grid>
                        <Grid item lg={2} md={12} xs={12}>
                            <Button
                                variant="contained"
                                fullWidth={true}
                                onClick={handleSubmit(onSubmit)}
                                style={{ height: "100%" }}
                            >
                                TÌM KIẾM
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Paper>
    );
}

export default React.memo(SearchPanel);