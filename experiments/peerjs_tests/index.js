
(document.onload = function () {
  var peer = new Peer({key: 'lwjd5qra8257b9'});
  var peers = 0;
  var conn;
  peer.on('open', function(id) {
    document.getElementById("peer_id").innerHTML = "My peer ID is: " + id;
  });

  peer.on('connection', function(conn) {
    add_message("Someone joined!");
    setup_conn(conn);
  });

  document.getElementById("peer_join").addEventListener('submit', function(e) {
    e.preventDefault();
    let peerid = document.getElementById("form_peerid").value;
    conn = peer.connect(peerid);
    setup_conn(conn);
  })

  function add_message(message) {
    let thing = document.createElement('div')
    thing.innerHTML = message
    document.getElementById('messages').append(thing)
  }

  function setup_conn(conn) {
    conn.on('open', function() {
      conn.on('data', function(data) {
        add_message(data);
      });
      document.getElementById("peer_send").addEventListener('submit', function(e) {
        e.preventDefault();
        let message = document.getElementById('form_message').value;
        conn.send(message);
      })
    })
  }
})();