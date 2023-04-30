const cookies={
	set:function(cookie_name,cookie_value,expiration_days=365,path='/'){
		let d=new Date();
		d.setTime(d.getTime()+(expiration_days*24*60*60*1000));
		d=d.toUTCString();
		document.cookie=`${cookie_name}=${cookie_value};expires=${d};path=${path}`;
	},
	get:function(cookie_name){
		let name=cookie_name+'=';
		let ca=decodeURIComponent(document.cookie).split(';');
		for(let i=0;i<ca.length;i++){
			let c=ca[i];
			while(ca[i].charAt(0)==' ') ca[i]=ca[i].substring(1);
			if(ca[i].indexOf(name)==0) return ca[i].substring(name.length,ca[i].length);
		}
		return '';
	},
	parseJWT:function(token){
		let base64Url=token.split('.')[1];
		let base64=base64Url.replace(/-/g,'+').replace(/_/g,'/');
		let jp=decodeURIComponent(atob(base64).split('').map(function(c){
			return '%'+('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		return JSON.parse(jp);
	}
}