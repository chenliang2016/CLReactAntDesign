
const loopTreeData = (treeNode, data, pid) => {
    let result = [], temp;
    for (var i = 0; i < data.length; i++) {
        const treeData = data[i];
        const treeDataName = treeData[treeNode.title];
        const treeDataKey = ""+treeData[treeNode.key];
        const treeDataPkey = ""+treeData[treeNode.pkey];

        if (treeDataPkey === pid) {
            let obj = {label: treeDataName, value: treeDataKey, key: treeDataKey};
            temp = loopTreeData(treeNode,data, treeDataKey);
            if (temp.length > 0) {
                obj.children = temp;
            }
            result.push(obj);
        }
    }

    return result;
};

export const getTreeData = (treeNode,dataList,pid) => {
    return loopTreeData(treeNode,dataList,pid);
}