const Helpers = {
    sortAsc: (data: any[], key: string) => {
        data.sort((a, b) =>
            (a[key] > b[key]) ? 1 : ((a[key] < b[key]) ? -1 : 0)
        );
        return data;
    },
    sortDesc: (data: any[], key: string) => {
        data.sort((a, b) =>
            (a[key] > b[key]) ? -1 : ((a[key] < b[key]) ? 1 : 0)
        );
        return data;
    },
}

export default Helpers;