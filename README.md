# Fren-game
An MMO game for frens.


## Protocol guide
### Server octoword (0-63):
0. Reserved, none
1. serverWorldUpdate, data = map object for player
2. serverNewPositions, data = array of Player objects
3. serverSendMsgToClient, data = string message to send
4. serverEvalAnswer, data = return from evaluated script
5.
6.
7.
### Client octoword (64-128):
64. Reserved, none
65. clientRequestWorld, data = unused
66. clientKeyPress, data = byte of key press positions, bit 0 = up, bit 1 = down, bit 2 = left, bit 3 = right
67. clientSendMsgToServer, data = string message to send
68. clientEvalServer, data = script to evaluate
69. Unused
70. Unused
71. Unused
