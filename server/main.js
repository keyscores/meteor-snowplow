// Deployed at tracker.keyscores.com with >mup deploy

Meteor.methods({
    reset: function() {
      Events.remove({});
    },

    update: function(ts) {
      Meteor._debug("TS: " + ts);
    }
});
  


//SERVING FILES IN METEOR AN NEEDS ABSOLUTE PATH
// Voodoo is needed to find the Meteor path whether online or in local dev.  Reference:http://stackoverflow.com/questions/17328807/what-is-the-meteor-server-side-path-to-public
var fs = Npm.require('fs');
var path = Npm.require('path');
PATH_FOR_YOUR_APP = path.join(__meteor_bootstrap__.serverDir, "../web.browser/app")

//USING IRON ROUTER TO SERVE STATIC FILES INSTEAD OF DEFAULT METEOR/PUBLIC, SO WE CAN GET THE QUERYSTRING PARAMS
//Snowplow will fail silently if unsuccessful in downloading i pixel.
//implementation from: http://stackoverflow.com/questions/31362749/meteor-js-serve-static-files-and-persist-query-string/31363579#31363579
Router.route('track/:fileName', {where: 'server'})
  .get(function () {
    this.response.writeHead(200, {
        'Content-type': 'image/png',
        'Content-Disposition': "attachment; filename=" + this.params.fileName
    });
    fs.createReadStream(PATH_FOR_YOUR_APP+"/pixel/"+this.params.fileName).pipe(this.response);
    
//insert query string params
    Events.insert({
      query: this.params.query
    });   
  })


