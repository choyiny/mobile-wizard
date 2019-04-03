# Mobile Wizard
![alt text][logo]

Note: For marking purposes, we have included Firebase secrets file and deployment instructions in the `secrets` branch.

## Project Demo
Youtube link: https://www.youtube.com/watch?v=_yBl1-YVUmw

## Introduction
Mobile Wizard is a web based 2-player street fighter like game that utilizes mobile browsers as player controllers.
Controller inspired by Nintendo Switch and mechanics inspired by Harry Potter wand dueling games, 2 players will fight to their
deaths by casting spells at the other player. The game host will show the health bars of the players on a computer browser
like street fighters.

## Live Demo
A live demo is available at https://game.projectmobilewizard.com.

## Documentation
Documentation is available in [Postman](https://documenter.getpostman.com/view/3226853/S17wNmYP#4951e759-a815-4894-aa5b-dc7cb2b10492)

## Project Contributors
Cho Yin Yong, Zhili Pan, Guo Bin Liu

## Beta Version key features
In the beta version, a game host (on a computer) will be able to host a game room for two players to join.
Two players will be able to join through their mobile browsers and prepare to duel.

The game host's screen will be able to show the health bar of the two players.
When the game starts, the players can swing their phones to cast spells,
and actions will cause damage to the other player, or prevent damage from the other player.

At the end of the game, some interesting statistics of the game such as the damage done by each player
will be shown to the player through the host screen.

The application will be easily deployable through a docker compose script with automatic certificate renewal with LetsEncrypt and nginx.

## Final Version additional features
Ability to join a room through a unique room ID automatically generated, and have the backend store the peer ids using Redis.

Players can save their data or change their nickname through authenticating with Firebase.

In addition to the healthbar shown in the host screen, 2D sprites corresponding with the action made by each player will also be shown. (strike, throw, defense, hit, death)

Error tracking with Sentry. PWA-ify frontend Angular app.

## Technologies
- [Flask](http://flask.pocoo.org/) - Backend Webserver.
- [PostgreSQL](https://www.postgresql.org/) - DMBS of choice to store information about players and the game session.
- [Angular](https://angular.io) - Framework responsible for client routing and frontend interactions.
- [Docker](https://docker.io) - For packaging the application for deployment at ease.
- [Firebase](https://firebase.google.com/) - For third-party authentication
- [Redis](https://redis.io/) - In memory data store
- [PeerJS](https://peerjs.com/) - WebRTC Peer to peer javascript library
- [PeerServer](https://github.com/peers/peerjs-server) - Broker connections between PeerJS clients.
- [Nginx](https://www.nginx.com/) - Web serving, reverse proxying, caching, load balancing 
- [LetsEncrypt](https://letsencrypt.org/) - Free, automated certificate generation and renewal
- [Cloudflare](https://cloudflare.com) - Our Content Delivery Network and DNS Management Tool
- [Phaser](https://phaser.io/) - Javascript Game Engine to render characters on screen.
- [Sentry](https://sentry.io) - Error Tracking Software for production.

## Top 5 Technical Challenges
1. **WebRTC Real-time communication** - Synchronizing the game state between the host and the players.
2. **Capturing and processing motion** - Translate the motion received by the mobile browser[[1]](http://www.albertosarullo.com/demos/accelerometer/) to an actual action.
3. **External API** - Learning how to integrate external APIs into our application.
4. **2D Graphics** - Rendering sprites onto the host screen using Phaser.
5. **Deploy ready application** - Have everything packaged with Docker (reverse proxy, compiling assets, load balancing etc)

[logo]: docs/you_a_wizard.png "You're a Wizard, Thierry."
