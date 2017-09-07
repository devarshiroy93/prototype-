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
					processedDate = calculateMinutesAndHours(data)
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

function calculateMinutesAndHours(date){
	var postDate =  new Date(date);
	var today =new Date(Date.now());
	var postDateHours = postDate.getHours();
	var postDateMinutes = postDate.getMinutes();
	var difference;
	 if(today.getHours() - postDateHours >= 1) {
		 difference =  (today.getHours() - postDateHours)*60 + Math.abs(postDateMinutes-today.getMinutes()) 
		 }
	 else{
		 difference = Math.abs(postDateMinutes-today.getMinutes());
		 }
	 
	if(difference >60) {
		difference = (difference/60).toString().charAt(0) 
		if(difference > 1){
			difference += ' hours ago'
		}
		else{
			difference += ' hour ago'
		}
		
	}else if(difference === 0){
		difference  = 'Just now'
	}
	else if(difference === 1){
		
		difference += " minute ago"
	}
	else{
		difference += " minutes ago"
	}
	
	return difference
}
