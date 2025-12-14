
const spacingValues = [5, 10, 15, 20, 25, 30];


const padding = () => {
    return spacingValues.reduce((acc, value, index) => {
        acc[`p${index + 1}`] = { padding: value };
        acc[`px${index + 1}`] = { paddingHorizontal: value };
        acc[`py${index + 1}`] = { paddingVertical: value };
        acc[`pt${index + 1}`] = { paddingTop: value };
        acc[`pb${index + 1}`] = { paddingBottom: value };
        acc[`pl${index + 1}`] = { paddingLeft: value };
        acc[`pr${index + 1}`] = { paddingRight: value };
        return acc;
    }, {} as Record<string, object>);
}

const margin = () => {
    return spacingValues.reduce((acc, value, index) => {
        acc[`m${index + 1}`] = { margin: value };
        acc[`mx${index + 1}`] = { marginHorizontal: value };
        acc[`my${index + 1}`] = { marginVertical: value };
        acc[`mt${index + 1}`] = { marginTop: value };
        acc[`mb${index + 1}`] = { marginBottom: value };
        acc[`ml${index + 1}`] = { marginLeft: value };
        acc[`mr${index + 1}`] = { marginRight: value };
        return acc;
    }, {} as Record<string, object>);
}

export {
    padding,
    margin
}