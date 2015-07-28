Router.route('/', function () {
  this.render('home');
});
Router.route('/debug', function () {
  this.render('debug');
});
Router.route('/dashboard', function () {
  this.render('dashboard');
  this.layout("layout");
});

Router.route('/client', function () {
  this.render('client');
  this.layout("layout");
});

Router.route('/action', function () {
  this.render('action');
  this.layout("layout");
});
