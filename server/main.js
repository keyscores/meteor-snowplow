// Test 
// meteor add iron:router
// meteor deploy experimental_meteor.meteor.com


  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({

    reset: function() {
      Events.remove({});
    },

    update: function(ts) {
      Meteor._debug("TS: " + ts);
      Events.find().forEach(function(event) {
        console.log(event);
      });
    }

  });

  // Serve actual file.
  // TODO(burdon): Serve actual file.
  //var fs = Npm.require('fs');
  //var file = fs.readFileSync('public/1x1.png'); 

  // Iron Router
  Router.route('i', function() {
    // Return valid image.
    this.response.writeHead(200, {
      'Content-type': 'image/png',
      'Content-Disposition': "attachment; filename=" + this.params.path
    });
    this.response.end();

    console.log('Router:', this.params.file, this.params.query);
    Events.insert({
      query: this.params.query
    });    
  }, { where: 'server' });


