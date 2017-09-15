/**
 * [保存数据到localstorage]
 * @param  {[Number]} id  [商家id]
 * @param  {[type]} key [属性值]
 * @param  {[type]} value [value值]
 * @return {[type]}       [description]
 */
export function savaToLocal(id,key,value){
 let seller = window.localStorage.__seller__;
 if(!seller){
 	seller = {};
 	seller[id] = {};
 }else{
 	seller = JSON.parse(seller);
 	if(!seller[id]){
 		seller[id] = {};
 	}
 }
seller[id][key] = value;
 window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	if(!seller){
		return def;
	}
	seller = JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret = seller[key];
	return ret||def;
}