
(document.onload = function () {
  function add_message(message) {
    let thing = document.createElement('div')
    thing.innerHTML = message
    document.getElementById('messages').append(thing)
  }

  function set_message(message) {
    document.getElementById('messages').innerHTML = message;
    console.log(message)
  }

  var Thing = function() {
    var self = this;
    this.peers = {};
    this.peer = new Peer(Math.random().toString(36).substring(2, 3).toUpperCase() + Math.random().toString(36).substring(2, 4), {key: 'lwjd5qra8257b9'});
    
    this.peer.on('open', function(id) {
      document.getElementById("peer_id").innerHTML = "My peer ID is: " + id;
    });

    // whenever I extablish a new connection,
    // this is what i do with that connection
    this.peer.on('connection', function(conn) {
      add_message(conn.id + " connected.");
      setup_conn(conn);
    })

    this.peer.on('error', function(err) {
      add_message(err);
    })


    // i want to connect to someone else
    this.add_peer = (peer_id) => {
      let peer = self.peer.connect(peer_id);
      setup_conn(peer);
    }

    // setting up the connection 
    var setup_conn = function (conn) {
      self.peers[conn.id] = conn;
      conn.on('open', function() {
        conn.on('data', function(data) {
          add_message(data);
        })
      });
    };

    // send a message to everyone i'm connected to
    this.send_message = (message) => {
      for (var peer_id in self.peers) {
        let peer = self.peers[peer_id];
        peer.send(self.peer.id + " sends: " +message);
      }
    }
  };

  var thing = new Thing();
  document.getElementById("peer_join").addEventListener('submit', function(e) {
    e.preventDefault();
    let peerid = document.getElementById("form_peerid").value;
    thing.add_peer(peerid);
  });
  document.getElementById("peer_send").addEventListener('submit', function(e) {
    e.preventDefault();
    let message = document.getElementById('form_message').value;
    thing.send_message(message);
  });
})();