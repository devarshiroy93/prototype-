function convertToReadableDate(date) {
    var dt = new Date(date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var formattedDate = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear()
    return formattedDate;
}
function processTimeStamp(data){
	var today;
	var postDate;
	var processedDate;
	today = new Date(Date.now());
	var postDate = new Date(data);
	if(postDate.getFullYear() === today.getFullYear()){
			if(postDate.getMonth() === today.getMonth()){
				if(postDate.getDate() === today.getDate()){
					if(postDate.getHours() === today.getHours()){
						if(postDate.getMinutes() === today.getMinutes()){
							processedDate = processSeconds(data)
						}else{
							processedDate = processMinutes(data);
						}
					}else{
						processedDate = processHours(data);
				}
				}else{
					processedDate = processMonth(data);
				}
				
			}else{
				processedDate = processMonth(data);
			}
	}else{
		processedDate = convertToReadableDate(data);
	}
	return processedDate
}
function processMonth(date){
	var postDate =  new Date(date);
	var today =new Date(Date.now());
	var difference 
	today.getDate()-postDate.getDate() === 1?  difference = today.getDate()-postDate.getDate()+' day ago': difference = today.getDate()-postDate.getDate()+' days ago';
	return difference
}

function processHours(date){
	var postDate =  new Date(date);
	var today =new Date(Date.now());
	var difference 
	today.getHours()-postDate.getHours() === 1?  difference = today.getHours()-postDate.getHours()+' hour ago': difference = today.getHours()-postDate.getHours()+' hours ago';
	return difference
}
function processMinutes(date){
	var postDate =  new Date(date);
	var today =new Date(Date.now());
	var difference 
	today.getMinutes()-postDate.getMinutes() === 1?  difference = today.getMinutes()-postDate.getMinutes()+' minute ago': difference = today.getMinutes()-postDate.getMinutes()+' minutes ago';
	return difference
}
function processSeconds(date){
	var postDate =  new Date(date);
	var today =new Date(Date.now());
	var difference 
	today.getSeconds()-postDate.getSeconds() === 1?  difference = today.getSeconds()-postDate.getSeconds()+' second ago': difference = today.getSeconds()-postDate.getSeconds()+' seconds ago';
	difference === '0 seconds ago' ? difference = 'just now' : ''
	return difference
}
