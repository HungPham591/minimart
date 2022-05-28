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
    isNumeric: (str: string) => {
        if (typeof str !== "string") return false;
        return !isNaN(parseFloat(str));//not a number
    },
    isHttpUrl: (str: string) => {
        let url;
        try {
            url = new URL(str);
        } catch (err) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
}

export default Helpers;