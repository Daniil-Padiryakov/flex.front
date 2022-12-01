import {ITodo} from "../domain/ITodo";

export const getTree = (items: any): ITodo[] => {
    // console.log(items)
    let copyItems = [...items];
    const itemsIdsByIndex: any = {};
    const roots = [];
    let item;
    let i;
    
    if (copyItems.length !== 0) {
        for (i = 0; i < copyItems.length; i++) {
            itemsIdsByIndex[copyItems[i].id] = i;
            console.log(copyItems[i])
            copyItems[i].children = [];
        }

        for (i = 0; i < copyItems.length; i++) {
            let depth = 1;
            item = copyItems[i];
            if (item.parent_id !== 0) {
                copyItems[itemsIdsByIndex[item.parent_id]].children.push(item);
            } else {
                roots.push(item);
            }
        }
    }
    return roots;
}