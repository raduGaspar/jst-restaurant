// API endpoints:
// Restaurant
//   CRUD menus {id: { name: string, price: number, list: object } }
//     - breakfast, $5
//         - list: id: { { name: string, description: string }}
//     - lunch, $15
//     - dinner, $25
//   CRUD bookings {id:{ name: string, phone: string, date & time: string||number, seats: number, smokers: bool }}
//   CRUD stock { id: { name: string, supplier: string, phone: string, address: string} } // name = product name
module.exports = function(app) {
  var menus = {},
    bookings = {},
    stock = {},
    genUid = function(coll) {
      var uid = Math.random().toString(36).substring(6);
      if((coll||menus)[uid]) {
        return genUid(coll);
      }
  
      return uid;
    };
    
  // console.log(req.body.hasOwnProperty);
  // res.statusCode = 400;
  // res.type('text/plain');
  // res.send('hello');
  
  app.get('/', function (req, res) {
    res.render('index');
  });
  
  /* CRUDs Menus */
  app.get('/menus', function(req, res) {
    res.json({status: 200, menus: menus});
  });
  
  app.post('/hack', function(req, res) {
     console.log('session from G.S.', req.body);
  });
  
  app.post('/menus', function(req, res) {
    if(req.body.name) {
      var uid = genUid(),
        entry = {
          uid: uid,
          name: req.body.name,
          price: req.body.price || 0,
          list: {}
        };
      menus[uid] = entry;
      res.json({status: 200, entry: entry});
    } else {
      res.json({status: 200, error: 'A name for the menu must be provided'});
    }
  });
  
  app.put('/menus/:id', function(req, res) {
    var id = req.params.id;
    menus[id].name = req.body.name || menus[id].name;
    menus[id].price = req.body.price || menus[id].price;
    res.json({status: 200, entry: menus[id]});
  });
  
  app.delete('/menus/:id', function(req, res) {
    var id = req.params.id;
    delete menus[id];
    res.json({status: 200, deleted: id});
  });
  
  /* CRUDs Menus List */
  app.get('/menus/:id/list', function(req, res) {
    var id = req.params.id;
    res.json({status: 200, list: menus[id].list});
  });
  
  app.post('/menus/:id/list', function(req, res) {
    if(req.body.name) {
      var id = req.params.id,
        uid = genUid(menus[id].list),
        entry = {
          uid: uid,
          name: req.body.name,
          description: req.body.description
        };
      menus[id].list[uid] = entry;
      res.json({status: 200, entry: entry});
    } else {
      res.json({status: 200, error: 'A name for the menu entry must be provided'});
    }
  });
  
  app.put('/menus/:id/list/:lid', function(req, res) {
    var id = req.params.id,
      lid = req.params.lid,
      list = menus[id].list[lid];
    
    list.name = req.body.name || list.name;
    list.description = req.body.description || list.description;
    
    res.json({status: 200, entry: list});
  });
  
  app.delete('/menus/:id/list/:lid', function(req, res) {
    var id = req.params.id,
      lid = req.params.lid;
    
    delete menus[id].list[lid];
    res.json({status: 200, deleted: lid});
  });
  
  /* CRUDs Bookings */
  app.get('/bookings', function(req, res) {
    res.json({status: 200, bookings: bookings});
  });
  
  app.post('/bookings', function(req, res) {
    if(req.body.name && req.body.phone && req.body.date && req.body.seats) {
      var uid = genUid(bookings),
        entry = {
          uid: uid,
          name: req.body.name,
          phone: req.body.phone,
          date: req.body.date,
          seats: req.body.seats,
          smokers: req.body.smokers || 0
        };
      bookings[uid] = entry;
      res.json({status: 200, entry: entry});
    } else {
      res.json({status: 200, error: 'The name, phone, date and seats are mandatory fields.'});
    }
  });
  
  app.put('/bookings/:id', function(req, res) {
    var id = req.params.id;
    bookings[id].name = req.body.name || bookings[id].name;
    bookings[id].phone = req.body.phone || bookings[id].phone;
    bookings[id].date = req.body.date || bookings[id].date;
    bookings[id].seats = req.body.seats || bookings[id].seats;
    bookings[id].smokers = req.body.smokers || bookings[id].smokers;
    
    res.json({status: 200, entry: bookings[id]});
  });
  
  app.delete('/bookings/:id', function(req, res) {
    var id = req.params.id;
    delete bookings[id];
    res.json({status: 200, deleted: id});
  });
  
  /* CRUDs Stock */
  app.get('/stock', function(req, res) {
    res.json({status: 200, stock: stock});
  });
  
  app.post('/stock', function(req, res) {
    if(req.body.name && req.body.phone && req.body.supplier && req.body.address) {
      var uid = genUid(stock),
        entry = {
          uid: uid,
          name: req.body.name,
          phone: req.body.phone,
          supplier: req.body.supplier,
          address: req.body.address
        };
      stock[uid] = entry;
      res.json({status: 200, entry: entry});
    } else {
      res.json({status: 200, error: 'The name, phone, supplier and address are mandatory fields.'});
    }
  });
  
  app.put('/stock/:id', function(req, res) {
    var id = req.params.id;
    stock[id].name = req.body.name || stock[id].name;
    stock[id].phone = req.body.phone || stock[id].phone;
    stock[id].supplier = req.body.supplier || stock[id].supplier;
    stock[id].address = req.body.address || stock[id].address;
    
    res.json({status: 200, entry: stock[id]});
  });
  
  app.delete('/stock/:id', function(req, res) {
    var id = req.params.id;
    delete stock[id];
    res.json({status: 200, deleted: id});
  });
};