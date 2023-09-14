
import {guid, haveRelationship} from "../util/tree";

export default class Links {
    static dataRelLinks : any= []
    static dataChildLinks :any = []

    static load(dataset:any){
		Links.dataRelLinks = [];
		Links.dataChildLinks = [];
		dataset = dataset || [];
				
		dataset.forEach(function(data:any){
			var id = data.id;
			if (Array.isArray(data.relationships)){
				data.relationships.forEach(function(rel:any){
					var partnerId = rel.partnerId;
					if (!haveRelationship(id, partnerId, Links.dataRelLinks)){
						var relId = guid(),
							direction = rel.direction;
						var relLink : any = {
							id: relId,
							fromNode: (direction == 'to') ? id : partnerId,
							toNode: (direction == 'to') ? partnerId : id
						};
						Links.dataRelLinks.push(relLink);
						var children = rel.children;
						if (Array.isArray(children) && children.length){
							relLink.hasChildren = true;

							children.forEach(function(childId){
								Links.dataChildLinks.push({
									id: guid(),
									childId: childId,
									relId: relId
								});
							});
						}
					}					
				});
				delete data.relationships;
			}	
		});
	}
}