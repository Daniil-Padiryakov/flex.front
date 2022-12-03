import {ITodo} from "../domain/ITodo";

export const tree = (items: any): ITodo[] => {
    const itemsIdsByIndex: any = {};
    const roots = [];
    let item;
    let i;

    if (items.length !== 0) {
        for (i = 0; i < items.length; i++) {
            itemsIdsByIndex[items[i].id] = i;
            items[i].children = [];
        }

        // console.log(itemsIdsByIndex)

        for (i = 0; i < items.length; i++) {
            item = items[i];
            if (item?.parent_id !== 0) {
                // console.log(item.parent_id)
                // console.log(items[itemsIdsByIndex[item.parent_id]])
                items[itemsIdsByIndex[item.parent_id]].children.push(item);
                // console.log(items[itemsIdsByIndex[item.parent_id]])
            } else {
                roots.push(item);
            }
        }
    }
    return roots;
}

export const getNodeTreeById = (tree: any, id: any) => {
    const stack = [tree];

    while (stack.length > 0) {
        const node = stack.pop();
        if (node.id === id) {
            return node
        }
        if (node.children?.length) {
            stack.push(...node.children.reverse())
        }
    }
}

export const getTreeIds = (tree: any) => {
    const stack = [tree];
    const result = [];


    while (stack.length > 0) {
        const node = stack.pop();
        if (node.id !== undefined) {
            result.push(node.id)
        }
        if (node.children?.length) {
            stack.push(...node.children)
        }
    }

    return result;
}