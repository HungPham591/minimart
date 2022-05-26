import { Button, Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import ClientFilterDropdown from '../../atoms/Dropdown';
import ClientInput from '../../atoms/SearchInput';

const filter = [
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
const styles = {
    root: {
        width: "100%",
        flexGrow: 1,
    },
    button: {
        height: "100%",
    }
};

function SearchPanel(props: any) {
    const [name, setName] = useState(null);
    const [sort, setSort] = useState(null);

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
                    <ClientInput label={props?.searchLabel} onChange={handleSearchInputChange}></ClientInput>
                </Grid>
                <Grid item lg={5} md={12} xs={12}>
                    <ClientFilterDropdown data={filter} onChange={handleFilterChange}></ClientFilterDropdown>
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <Button title='' variant="contained" fullWidth={true} onClick={handleSortButton} className={props?.classes?.button}>TÌM KIẾM</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withStyles(styles)(SearchPanel);