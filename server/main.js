// Test 
// meteor add iron:router
// meteor deploy experimental_meteor.meteor.com from burdon's macbook
//meteor deploy kstracker.meteor.com from lucas's macbook

  Meteor.methods({

    reset: function() {
      Events.remove({});
    },

    update: function(ts) {
      Meteor._debug("TS: " + ts);
    }

  });
  
var fs = Npm.require('fs');
var path = Npm.require('path');

console.log(path.resolve('.'));
console.log(path.resolve('.', '../../../../../'));

PATH_FOR_YOUR_APP = path.resolve('.', '../../../../../'); //NEEDS ABSOLUTE PATH using https://nodejs.org/api/path.html#path_path_basename_p_ext

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
  
 /*

  // Serve actual file.
  // TODO(burdon): Serve actual file.
  var fs = Meteor.npmRequire('fs');
  var file = fs.createReadStream('/public/cat.png'); 
 //fs.writeFile('message.txt', 'Hello new', function (err) {
  //if (err) throw err;
  //console.log('It\'s saved!');
//});

  // Iron Router
  
  Router.route('i', function() {
    // Return valid image.
    this.response.writeHead(200, {
      'Content-type': 'image/png',
      'Content-Disposition': "attachment; filename=" + this.params.path
    });
   // this.response.write('hello');
    this.response.end('hello');
    //fs.createReadStream(file).pipe(this.response);

    //console.log('Router:', this.params.file, this.params.query);
    Events.insert({
      query: this.params.query
    });    
  }, { where: 'server' });


//meteor's webapp request handler listener
//console.log(WebApp.connectHandlers.listen());

*/

