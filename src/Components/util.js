export const sortData = (data) => {
    const sortedData = [...data];

    // sortedData.sort((a, b) => {
    //     if(a.cases>b.cases)
    //         return -1;      //if a>b then dont swap
    //     else
    //         return 1;
    // })

    // return sortedData;

    return sortedData.sort((a, b) => a.cases>b.cases ? -1 : 1);
}