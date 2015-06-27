
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function() {
      return Events.find().count()
    }
  });

  Template.hello.events({
    'click button[event=reset]': function() {
      Meteor.call('reset', function(error) {
        error && console.log(error);
      });
    }
  });

  Template.hello.events({
    'click button[event=test]': function() {
      // increment the counter when button is clicked

      var ts = new Date().getTime();
      Events.insert({
        text: 'Event: ' + ts
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
