  test = [
{ "_id" : "ayqpYDkcojbSYb7Gr", "e" : "pv", "url" : "http://localhost:3000/test_local.html", "page" : "Test Page", "tv" : "js-2.4.2", "tna" : "cf", "aid" : "catlogger.com", "p" : "web", "tz" : "America/New_York", "lang" : "en-US", "cs" : "UTF-8", "f_pdf" : "1", "f_qt" : "0", "f_realp" : "0", "f_wma" : "0", "f_dir" : "0", "f_fla" : "1", "f_java" : "1", "f_gears" : "0", "f_ag" : "0", "res" : "1366x768", "cd" : "24", "cookie" : "1", "eid" : "fe5a6dfd-979b-4948-9530-cb64e1612363", "dtm" : "1436744286347", "vp" : "1362x673", "ds" : "1362x673", "vid" : "7", "duid" : "cccf5154fc76440e", "fp" : "724669886" },
{ "_id" : "ReLggesTiYPx5n7nr", "e" : "se", "se_ca" : "test", "se_ac" : "click", "tv" : "js-2.4.2", "tna" : "cf", "aid" : "catlogger.com", "p" : "web", "tz" : "America/New_York", "lang" : "en-US", "cs" : "UTF-8", "f_pdf" : "1", "f_qt" : "0", "f_realp" : "0", "f_wma" : "0", "f_dir" : "0", "f_fla" : "1", "f_java" : "1", "f_gears" : "0", "f_ag" : "0", "res" : "1366x768", "cd" : "24", "cookie" : "1", "eid" : "f1d2df2a-2968-409d-bd80-bd8124ac8e24", "dtm" : "1436744289076", "vp" : "1362x673", "ds" : "1362x673", "vid" : "7", "duid" : "cccf5154fc76440e", "fp" : "724669886", "url" : "http://localhost:3000/test_local.html" },
{ "_id" : "vX9dz62xEwvmRaQ2f", "e" : "se", "se_ca" : "test", "se_ac" : "click", "tv" : "js-2.4.2", "tna" : "cf", "aid" : "catlogger.com", "p" : "web", "tz" : "America/New_York", "lang" : "en-US", "cs" : "UTF-8", "f_pdf" : "1", "f_qt" : "0", "f_realp" : "0", "f_wma" : "0", "f_dir" : "0", "f_fla" : "1", "f_java" : "1", "f_gears" : "0", "f_ag" : "0", "res" : "1366x768", "cd" : "24", "cookie" : "1", "eid" : "d4ff19ae-854b-4bbf-81e2-ec78685f4c22", "dtm" : "1436744419374", "vp" : "1362x673", "ds" : "1362x673", "vid" : "7", "duid" : "cccf5154fc76440e", "fp" : "724669886", "url" : "http://localhost:3000/test_local.html" },
{ "_id" : "yJDRvJRvcgaA6iams", "e" : "se", "se_ca" : "test", "se_ac" : "click", "tv" : "js-2.4.2", "tna" : "cf", "aid" : "catlogger.com", "p" : "web", "tz" : "America/New_York", "lang" : "en-US", "cs" : "UTF-8", "f_pdf" : "1", "f_qt" : "0", "f_realp" : "0", "f_wma" : "0", "f_dir" : "0", "f_fla" : "1", "f_java" : "1", "f_gears" : "0", "f_ag" : "0", "res" : "1366x768", "cd" : "24", "cookie" : "1", "eid" : "311478d8-1267-4cff-a449-22e0def94167", "dtm" : "1436744429891", "vp" : "1362x673", "ds" : "1362x673", "vid" : "7", "duid" : "cccf5154fc76440e", "fp" : "724669886", "url" : "http://localhost:3000/test_local.html" }
]

console.log(moment(Number(test[0].dtm)).format('YYYY-MM-DD'));

Template.eventDonut.rendered = function () {
  //blaze templates passes in a data context, arguement called chartType, which can be = "donut", "bar" or any C3 type this.data.chartType
  var eventData = [{"pageviews":0, "structuredEvents":0}]
  var eventSeries = ['pageviews', 'structuredEvents']
//Need to initialize chart non-reactively. Otherwise re-rendering gets exepensive on every data push. Better to just push
//new data to an already rendered chart. Use chat.load within autorun
	var chart = c3.generate({
		bindto: this.find('.chart'),
		data:{
      type: this.data.chartType,
			json: eventData,
			keys: {
				value: eventSeries,
			}
		}

	});

	Tracker.autorun(function () {
    eventData[0].pageviews = Events.find({e:"pv"}).count()
    eventData[0].structuredEvents = Events.find({e:"se"}).count()
	  if(chart){
		  chart.load({
				json: eventData,
				keys: {
					value: eventSeries,
				}
		  });
    }
  });
},


Template.debug.helpers({
  counter: function() {
    return Events.find().count()
  },
  last: function() {
    return EJSON.stringify(Events.find().fetch().pop(), {indent:true})
  }

});

Template.debug.events({
  'click button[event=reset]': function() {
    Meteor.call('reset', function(error) {
      error && console.log(error);
    });
  }
});

Template.debug.events({
  'click button[event=test]': function() {
    // increment the counter when button is clicked

    var ts = new Date().getTime();
    Events.insert({
      event: 'test',
      time: ts
    });
    Meteor.call('update', ts, function(error) {
      error && console.log(error);
    });

    /*
    Session.set('counter', Session.get('counter') + 1);
    Meteor.call('update', Session.get('counter'), function(error) {
      error && console.log(error);
    });
    */
  }
});

Template.login.events({
  'submit form': function(event){
			event.preventDefault();
			var emailVar = event.target.loginEmail.value;
			var passwordVar = event.target.loginPassword.value;
			Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
  			if(!err){
  			  Router.go('dashboard');
  			}
      });
		}
});
