# Mobile Wizard
![alt text][logo]

## Introduction
Mobile Wizard is a web based 2-player street fighter like game that utilizes mobile browsers as player controllers.
Controller inspired by Nintendo Switch and mechanics inspired by Harry Potter wand dueling games, 2 players will fight to their
deaths by casting spells at the other player. The game host will show the health bars of the players on a computer browser
like street fighters.

## Project Contributors
Cho Yin Yong, Zhili Pan, Guo Bin Liu

## Beta Version key features
In the beta version, a game host (on a computer) will be able to host a game for two players to join.
Two players will be able to join through their mobile browsers and prepare to duel.

The game host's screen will be able to show the health bar of the two players.
When the game starts, the players can make predetermined actions (such as imitating a throw) with their phones,
and actions will cause damage to the other player. Also, predetermined actions may block some damage caused by
the other player.

A leaderboard for the highest damage done by a single action will be available for everyone in the main website.

## Final Version additional features
Players will be able to join a game room by taking a picture of themselves, and the system will automatically
generate a nickname based on that image.

Post game analysis shown as graphs at the end of the game.

## Technologies
- [Flask](http://flask.pocoo.org/) - Backend Webserver.
- [Flask SocketIO](https://flask-socketio.readthedocs.io/en/latest/) - Websocket communication between client and server.
- [PostgreSQL](https://www.postgresql.org/) - DMBS of choice to store information about players and the game session.
- [Angular](https://angular.io) - Framework responsible for client routing and frontend interactions.
- [three.js](https://threejs.org) - Rendering 3D models for spectators
- [Docker](https://docker.io) - For packaging the application for deployment at ease.
- [Postman](https://www.getpostman.com) - Testing medium for the backend API.
- [Google Custom Search API](https://developers.google.com/custom-search/) - for "Face ID'ing" players


## Top 5 Technical Challenges
1. **Real-time communication** - The synchronization[[1]](http://www.gabrielgambetta.com/client-server-game-architecture.html) with a client-server game architecture through websockets.
2. **Capturing and processing motion** - How to translate the motion received by the mobile browser to an actual action with backend magic?
3. **3D models** - Display 3D models that can dynamically move based on game action.
4. **Post game statistics** - Storing data of a game for analysis after the game so that graphing statistics is possible.
5. **Deploy ready application** - Have everything packaged with Docker (reverse proxy, compiling assets, load balancing etc)

[logo]: docs/you_a_wizard.png "You're a Wizard, Thierry."
