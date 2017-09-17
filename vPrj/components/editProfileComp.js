var newComp = Vue.component('edit-profile',{
	'template' :`<div>
		<div class="full-width">
            <h1 class="editProfileHeading">Your Profile</h1>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="custom-form">
                <div class="text-center bg-form">
                    <div class="img-section">
                        <img src="https://lh3.googleusercontent.com/-hh0FaEc01vk/AAAAAAAAAAI/AAAAAAAAAAc/SOQUQZcP0Q8/photo.jpg" alt="Profile Picture" class="editProfilePicture card-img-top sideBarImgClass">
                        <span class="fake-icon-edit" id="PicUpload" style="color: #ffffff;"><span class="glyphicon glyphicon-camera camera"></span></span>
                    <div class="col-lg-12">
                        <h4 class="text-right col-lg-12"><span class="glyphicon glyphicon-edit"></span> Edit Profile</h4>
                        <input type="checkbox" class="form-control" id="checker">
                    </div>
                    </div>
                </div>
                <div class="editSection col-lg-12 col-md-12 col-sm-12 col-xs-12">
                	<div class="col-md-6 col-sm-6 col-xs-12 col-lg-6 recentPost">
                        <div>
                            <div class="recentPostHeading col-lg-12 col-md-12 col-sm-12 col-xs-12 subheader"><span class="recentPostHeadingText">Your Recent Posts</span><span><i class="material-icons">keyboard_arrow_down</i></span></div>
                            <div class="dashboard-card-block recentPostBody col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                                    <img src="https://lh3.googleusercontent.com/-hh0FaEc01vk/AAAAAAAAAAI/AAAAAAAAAAc/SOQUQZcP0Q8/photo.jpg" alt="Card image cap" class="img-responsive">
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10 commentBody">
                                    <div class="col-md-12 col-sm-12 col-xs-12 cardUserName">
                                        <span class="subheader userName dashboard-card-title">Chandan Choudhary</span>
                                        <span class="post-time caption">3 days ago</span>
                                    </div>
                                     <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">Post @ 13:26<!----></p>
                                </div>
                           </div>
                        </div>
                    </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12 editInfoPanel">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                    <div class="profileInfo subheader">Profile Info</div>
    	                <div class="col-lg-12 col-md-12 personalInfoInput">
    	                    <input type="text" class="form-control form-group form-input editFormFistChild" value="Chandan Choudhary " placeholder="Name" disabled id="name">
    	               </div>
    	                <div class="col-lg-12 col-md-12 personalInfoInput">
    	                    <input type="text" class="form-control form-group form-input" value="rgba@gmail.com" placeholder="Email ID" disabled id="email">
                        </div>
    	                <div class="col-lg-12 col-md-12 personalInfoInput">
    	                    <input type="text" class="form-control form-group form-input" value="+91-00000000" placeholder="Phone Number" disabled id="phone">
                            <span class="material-icons editInfo">mode_edit</span>
    	                </div>
    	                <div class="col-lg-12 col-md-12 personalInfoInput">
    	                    <input type="text" class="form-control form-group form-input" value="Kolkata, India" placeholder="Address" disabled id="place">
                            <span class="material-icons editInfo">mode_edit</span>
    	                </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 personalInfoPanel">
                    <div class="personalInfo subheader">Personal Info</div>
                        <div class="col-lg-12 col-md-12 personalInfoInput">
                            <input type="text" class="form-control form-group form-input editFormFistChild" value="Abhinit Roy" placeholder="Name" disabled id="name">
                       </div>
                        <div class="col-lg-12 col-md-12 personalInfoInput">
                            <input type="text" class="form-control form-group form-input" value="rgba@gmail.com" placeholder="Email ID" disabled id="email">
                        </div>
                        <div class="col-lg-12 col-md-12 personalInfoInput">
                            <input type="text" class="form-control form-group form-input" value="+91-00000000" placeholder="Phone Number" disabled id="phone">
                            <span class="material-icons editInfo">mode_edit</span>
                        </div>
                        <div class="col-lg-12 col-md-12 personalInfoInput">
                            <input type="text" class="form-control form-group form-input" value="Chandigarh, India" placeholder="Address" disabled id="place">
                            <span class="material-icons editInfo">mode_edit</span>
                        </div>
                    </div>
                        <div class="col-lg-12 col-md-12 editButton">
                            <button type="button" class="btn btn-sm primary-btn interactive-text">Update Changes</button>
                            <button type="button" class="btn btn-sm btn-default interactive-text">Cancel</button>
                        </div>
                    </div>
                
               
                </div>
            </div>
        </div>

    </div>
    </div>
        
</div>`
})
