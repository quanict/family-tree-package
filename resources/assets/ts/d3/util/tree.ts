export const getDataById = function (id: string, dataset: any) {
    let data = null;
    if (Array.isArray(dataset))
        for (let i = 0; i < dataset.length; i++) {
            const d = dataset[i];
            if (d.id == id) {
                data = d;
                break;
            }
        }
    return data;
}

export function getId(d: any) {
    return d.id;
}

export function guid() {
    function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function haveRelationship(id1:any, id2:any, set:any){
    set = set || [];
    return set.some(function(link:any){
        return (link.fromNode == id1 && link.toNode == id2) || (link.fromNode == id2 && link.toNode == id1);
    });
}
