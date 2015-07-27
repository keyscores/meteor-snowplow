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
