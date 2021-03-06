var now = moment()
Template.dashboard.helpers({
  eventTableData:function () {
        return Events.find().fetch();
  },
  tableSettings: function () {
    return {
      fields: [ {key: 'duid', label: 'User Fingerprint'},{ key: 'url', label: 'URL' },{ key: 'e', label: 'Event',  fn: function (value, object) { if (value==="pv"){return "Pageview"}else{return "Click: " + object.ue_px_decoded.elementId}}},{ key: 'hour', label: 'Hour', sortOrder: 0, sortDirection: 'descending', fn: function (value, object) { if (value){ return moment(value).format("YYYY-MM-DD HH:mm") }else{return"n/a"}}}]
    };
  }
});

Template.event.rendered = function () {
  //blaze templates passes in a data context, arguement called chartType, which can be = "donut", "bar" or any C3 type this.data.chartType
  var eventData = [{"pageviews":0}]
  var eventSeries = ['pageviews', 'cart','checkout', 'update', 'other']
//Need to initialize chart non-reactively. Otherwise re-rendering gets exepensive on every data push. Better to just push
//new data to an already rendered chart. Use chat.load within autorun
	var chart = c3.generate({
		bindto: this.find('.chart'),
    // color: {pattern: ['#0d47a1', '#1976d2', '#2196f3','#64b5f6']},
    color: {pattern: ['#1976d2', '#2196f3','#64b5f6']},
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
    eventData[0].checkout = Events.find({"ue_px_decoded.elementId":"checkout"}).count()
    eventData[0].cart = Events.find({"ue_px_decoded.elementId":"add-to-cart"}).count()
    eventData[0].update = Events.find({"ue_px_decoded.elementId":"update"}).count()
    eventData[0].other = Events.find({"ue_px_decoded.elementId":{ $nin: [ "update", "add-to-cart","checkout" ] },e:"ue" }).count()

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

Template.timeseries.rendered = function () {

  //console.log(EJSON.parse(test[0].dtm));
  //blaze templates passes in a data context, arguement called chartType, which can be = "donut", "bar" or any C3 type this.data.chartType


//Need to initialize chart non-reactively. Otherwise re-rendering gets exepensive on every data push. Better to just push
//new data to an already rendered chart. Use chat.load within autorun
	var chart = c3.generate({
		bindto: this.find('.chart'),

		data:{
      type: "bar",
			json: [{}],
			keys: {
        value: ["count"],
        x: "hour"
			},
      names:{
        count:'Total Events'
      }
		},
    axis: {
          x: {
              type: 'timeseries',
              max: now+1080000,
              tick: {
                      format: '%d-%m %H:%M',
                      rotate: 60,
              },
              // padding: {
              //   left: 1,
              //   right: 1,
              // }
          }
      },
      bar: {
        width: 2,
        //ratio: .05,
      }

	});
  Tracker.autorun(function () {
    eventData = AggCollection.find({hour: { $gt: 0}}).fetch()
    console.log(eventData);

    chart.load({
        json: eventData,
        keys: {
            value: ['count'],
            x: 'hour'
        }
    });
  });

	// Tracker.autorun(function () {
  //
	//   if(chart){
	// 	  chart.load({
	// 			json: eventData,
	// 			keys: {
	// 				value: ["f_pdf"],
  //         x: ["dtm"]
	// 			}
	// 	  });
  //   }
  // });
},

Template.debug.onRendered = function(){
  Tracker.autorun(function(){
     console.log(Agg.find().fetch()[0]);
  });
}

Template.debug.helpers({
  counter: function() {
    return Events.find().count()
  },
  last: function() {
    return EJSON.stringify(Events.find().fetch().pop(), {indent:true})
  },
  agg: function() {
    result = AggCollection.find().fetch()
    return EJSON.stringify(result, {indent: true});
  }

});

Template.debug.events({
  'click button[event=agg]': function() {
    Meteor.call('agg', function(error) {
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

Template.action.inheritsHelpersFrom("dashboard");

Template.client.inheritsHelpersFrom("dashboard");
