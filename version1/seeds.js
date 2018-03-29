var mongoose   = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment    = require("./models/comment");

var data = [
             {
               name  :"Smuggler's Den Campground",
               image :"https://acadiamagic.com/280x187/smugglers-den-1.jpg",
               description : "Family Camping! We are uniquely located to explore many hiking trails in Acadia National ParkLorem ipsum dolor sit amet, pro nonumy democritum intellegebat ad, ut duo zril omnium verterem, ex est dicunt cetero voluptatum. Nam an mucius petentium, qui et iriure feugiat albucius. Ne sonet eripuit est, ad dignissim persecuti est, at est feugiat invenire molestiae. Sit et ludus salutandi, an movet propriae ocurreret duo, feugiat consetetur eum at. Verear apeirian oportere nam no. Causae forensibus vis et. Ea brute veritus eligendi quo."
             },
             {
               name  :"Hadley's Point Campground",
               image :"https://acadiamagic.com/280x187/hadleys-cabins.jpg",
               description : "Family owned and operated for over 40 years.Lorem ipsum dolor sit amet, pro nonumy democritum intellegebat ad, ut duo zril omnium verterem, ex est dicunt cetero voluptatum. Nam an mucius petentium, qui et iriure feugiat albucius. Ne sonet eripuit est, ad dignissim persecuti est, at est feugiat invenire molestiae. Sit et ludus salutandi, an movet propriae ocurreret duo, feugiat consetetur eum at. Verear apeirian oportere nam no. Causae forensibus vis et. Ea brute veritus eligendi quo."
             },
             {
               name  :"Mount Desert Campground",
               image :"https://acadiamagic.com/280x187/md-campground.jpg",
               description : "We are in the heart of Mount Desert Island right next to Acadia National Park and the ocean.Lorem ipsum dolor sit amet, pro nonumy democritum intellegebat ad, ut duo zril omnium verterem, ex est dicunt cetero voluptatum. Nam an mucius petentium, qui et iriure feugiat albucius. Ne sonet eripuit est, ad dignissim persecuti est, at est feugiat invenire molestiae. Sit et ludus salutandi, an movet propriae ocurreret duo, feugiat consetetur eum at. Verear apeirian oportere nam no. Causae forensibus vis et. Ea brute veritus eligendi quo."
             }
          ]
function seedDB(){
	//remove all campgrounds
	Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
    //add a few campgrounds
     data.forEach(function(seed){
    	Campground.create(seed,function(err,campground){
    		if(err){
    			console.log(err);
    		} else{
    			console.log("added a campground");
    			//add a comments
    			Comment.create(
    				{
    					text : "This place is nice but there is no internet",
    					author : "John"
    				}, function(err,comment){
    					if(err){
    						console.log(err);
    					} else{
    						campground.comments.push(comment);
    						campground.save();
    						console.log("created new comment");
    					}
    				});
    		}
    	});
     }); 

   });

   
    
   

}

module.exports = seedDB;
