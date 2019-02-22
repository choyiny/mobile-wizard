# Mobile Wizard
![alt text][logo]

## Introduction
Mobile Wizard is a web based 2-player street fighter like game that utilizes mobile browsers as player controllers.
Controller inspired by wii and mechanics inspired by Harry Potter wand dueling games, players will fight to their
deaths by casting spells at the other player.

## Project Contributors
Cho Yin Yong, Zhili Pan, Guo Bin Liu

## Beta Version key features
- Frontend sends motion to backend
- Backend detects motion, translates it to a spell (either attack or defense), and sends it back
- Frontend can show actions of both players
- Players can duel against each other with simple actions

## Final Version additional features
- Additional actions for added fun

## Technologies
- Flask as a backend
- Flask SocketIO as Websocket
- Angular as a frontend
- three.js for 3D model rendering
- Google Custom Search API for "Face ID'ing" players
- Docker for deployment
- Postman as a testing medium for the backend API


## Top 5 Technical Challenges
- The synchronization with client-server game architecture with websockets to minimize stuttering. (http://www.gabrielgambetta.com/client-server-game-architecture.html)
- Process the phone's motion and translate it to a game action (eg. punch, dodge, or stab?)
- Display 3D models that can dynamically move based on game action.

[logo]: you_a_wizard.png "You're a Wizard, Thierry."
