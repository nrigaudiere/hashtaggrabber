//Clear entries
var clearValues = function(){
	$('#searchinput').val("").focus();
};

/// EventHandler ///
var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13) {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};
/// END EventHandler ///


//Declarations
Hashtags = new Meteor.Collection("hashtags");


if (Meteor.isClient) {
	
	Tweets = new Meteor.Collection("tweets");
	
	//Get all hashtags from History Collection
	Template.searchTwit.hashtags = function(){
		return Hashtags.find();
	};
	
	Template.searchTwit.tweets = function (){
		return Tweets.find();
	};
	
	Template.searchTwit.events(okCancelEvents(
		
		'#searchinput',
		{
			//Add new hashtag to history Collection
			ok : function(text, evt){
				
				var searchInput = $('#searchinput').val();					 
				Hashtags.insert({hashtag:text});	
				
				//On new search, removes all entries from the collection	
				Tweets.remove({});
				
				
				var tw = Meteor.call('getTwits', text);
			    
			    
			    			    
				clearValues();			 	
				}
		}));
	

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Tweets = new Meteor.Collection("tweets");
    
    Accounts.loginServiceConfiguration.remove({
    service: "twitter"
  });
  Accounts.loginServiceConfiguration.insert({
    service: "twitter",
    consumerKey: "3wqbNNvwn0K3VSRSKzBeVQ",
    secret: "InWnI8wlxy8FdEbSG0IDSLOVFrvLDcRFKSJdKDPMqCw"
  });

	});
	
	

	Meteor.methods({
		'getTwits' : function getTwits(user) {

			

			var T = new Twit({
				consumer_key : '3wqbNNvwn0K3VSRSKzBeVQ',
				consumer_secret : 'InWnI8wlxy8FdEbSG0IDSLOVFrvLDcRFKSJdKDPMqCw',
				access_token : '2354550830-vANmqnhjQQqGUjzQofQaj5JrUdZQYrA1Xk6IYH3',
				access_token_secret : 'wKa9NOvK4FrrLMWIZhWmjoGZOIAWChoVHlq3mdFssek2V'
			});
			
			  var stream = T.stream('statuses/filter', { track: user })
				
				
					stream.on('tweet', function (tweet) {
					  
					  console.log(tweet.text);
					  
					  //Adds to the server collection 
					// Tweets.insert(tweet.text);
					  
					  
					 });
					 
				
			  		
				return ;
		}
	}); 


	
	
}



