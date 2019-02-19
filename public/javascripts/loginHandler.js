$('#login').click(function(){
  $('#login-form')[0].setAttribute('action', '/login');
});

$('#admin-login').click(function(){
  $('#login-form')[0].setAttribute('action', '/adminLogin');
});