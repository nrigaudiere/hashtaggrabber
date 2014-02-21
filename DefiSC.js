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
	
	//Get all hashtags from History Collection
	Template.searchTwit.hashtags = function(){
		return Hashtags.find();
	}
	
	Template.searchTwit.events(okCancelEvents(
		
		'#searchinput',
		{
			//Add new hashtag to history Collection
			ok : function(text, evt){
									 var searchInput = $('#searchinput').val();								 
									 Hashtags.insert({hashtag:text});
									 	
									}
		}));
	
	
		
  Template.searchtwit.greeting = function () {
    return "Welcome to DefiSC.";
  };

  Template.searchtwit.events({
    'keyup input#myname': function (evt) {
    var name = $('#lobby input#myname').val().trim();
    Hashtags.update(Session.get('player_id'), {$set: {name: name}});
    console.log();
  },
  'click button.startgame': function () {
    Meteor.call('start_new_game');
  }
    
  });
	

  
  var Twit = require('twit');

	var T = new Twit({
	    consumer_key:         '...'
	  , consumer_secret:      '...'
	  , access_token:         '...'
	  , access_token_secret:  '...'
	});
  
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    

	});
}


