var friendsData= require("../data/friends.js")
console.log(friendsData);

// Displays all friends

module.exports= function(app){
app.get("/api/friends", function(req, res) {
    return res.json(friendsData);
  });
  
  // Displays a single friend, or returns false
  app.get("/api/friends/:name", function(req, res) {
    var chosen = req.params.name;

    console.log(chosen);
  
    for (var i = 0; i < friendsData.length; i++) {
      if (chosen === friendsData[i].routeName) {
        return res.json(friendsData[i]);
      }
    
    }
    
    return res.json(false);
  });
  
  // Create New friends - takes in JSON input
  app.post("/api/friends", function(req, res) {

    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware

    var newfriend = req.body;
    var newfriendScores = req.body.scores;
    var match = {
      name: "",
      image: "",
      friendScore: 1000
    }
    // var totalDifference = 0;
    console.log("Total difference is working")
    for(i=0; i<friendsData.length; i++){
      var currentFriend= friendsData[i];
      console.log("current friend name: " + currentFriend.name);
      var totalDifference= 0;
      for(j=0; j<currentFriend.scores.length; j++){
        console.log("current friend scores : " + currentFriend.scores);
        console.log("totaldifference line 47: "+ totalDifference)
        totalDifference += Math.abs(parseInt(currentFriend.scores[j])- parseInt(newfriendScores[j]));
        console.log("totaldifference: "+ totalDifference)

      }
      if(totalDifference <= match.friendScore){
        match = {
          name: currentFriend.name,
          image: currentFriend.image,
          personality: currentFriend.personality,
          friendScore: totalDifference
        }
        console.log(match);
      }

    }
      friendsData.push(newfriend);
  
  
    res.json(match);
    
    
  });
}


