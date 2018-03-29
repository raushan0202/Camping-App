var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");



//INDEX route - show all campgrounds
router.get("/",function(req,res){
    //Get all campgrounds from db
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else
        {
            res.render("campgrounds/index",{campgrounds : allCampgrounds, currentUser : req.user });
        }
    });

	
});
//CREATE route - add new campgrounds to DB
router.post("/", middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampgrounds = {name :name ,price :price,image : image ,description : desc,author : author};
    //create a new campground and save to DB
    Campground.create(newCampgrounds,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });

    
});

//NEW route -show form to create new campground
router.get("/new", middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//SHOW route -shows more info about one campground
router.get("/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground

            res.render("campgrounds/show",{ campground : foundCampground});
        }
    });
    

});

//EDIT Route
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds");
            //console.log(err);
        } else{
            res.render("campgrounds/edit",{ campground : foundCampground});
        }
    });
    
});

//UPDATE Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;