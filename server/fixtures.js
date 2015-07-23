if  (Meteor.users.find().count() === 0){

  var users = [
    {name:"Admin Editor",email:"admin@admin.com",roles:['editor']},
    {name:"Viewer",email:"view@view.com",roles:['not']},

  ];

_.each(users, function (user) {
  var id;

  id = Accounts.createUser({
    email: user.email,
    password: "1234",
    profile: { name: user.name }
  });

  if (user.roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user.roles);
  }

 });
 } else {
 console.log('Already has users in DB, skipping user account fixtures')
 };
