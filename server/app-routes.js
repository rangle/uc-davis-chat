module.exports = function (app, users) {
  app.put('/api/contacts/add/:email', (req, response) => {
    const email = request.params.email;


  });

  app.get('/api/contacts/list', (req, response) => {
    const list = Object.keys(users).map(key => users[key]);

    response.send(list);
  });
};
