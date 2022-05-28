import { Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import CustomDropdown from '../../atoms/Dropdown';
import CustomInput from '../../atoms/SearchInput';

const filterData = [
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
]


function SearchPanel(props: any) {
    const [name, setName] = useState(null);
    const [sort, setSort] = useState(filterData[0].value);

    const handleSortButton = () => {
        props?.handleSortButton({ name, sort });
    }
    const handleSearchInputChange = (e: any) => {
        setName(e?.target?.value)
    }
    const handleFilterChange = (e: any) => {
        setSort(e?.target?.value);
    }
    return (
        <Container>
            <Grid spacing={3} container>
                <Grid item lg={5} md={12} xs={12}>
                    <CustomInput label={props?.searchLabel} onChange={handleSearchInputChange}></CustomInput>
                </Grid>
                <Grid item lg={5} md={12} xs={12}>
                    <CustomDropdown defaultValue={sort} title="Sắp xếp" data={filterData} onChange={handleFilterChange}></CustomDropdown>
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <Button title='' variant="contained" fullWidth={true} onClick={handleSortButton} style={{ height: "100%" }}>
                        TÌM KIẾM
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default React.memo(SearchPanel);