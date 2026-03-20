import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

interface JoinRoomPayload {
  room: string;
  username: string;
}

interface MessagePayload {
  room: string;
  username: string;
  message: string;
}

interface ChatMessage {
  senderId: string;
  username: string;
  message: string;
  deliveredTo: string[]; // track users who received it
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  allowedUsers = ['111', '222', '333', '444', '555'];

  roomMessages: Record<string, ChatMessage[]> = {};

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('join-room')
  async joinRoom(client: Socket, data: JoinRoomPayload) {
    const { room, username } = data;

    if (!this.allowedUsers.includes(username)) {
      client.emit('login-error', 'User does not exist');
      client.disconnect();
      return;
    }

    await client.join(room);

    console.log(username, 'joined', room);

    const allMessages = this.roomMessages[room] || [];

    // send only messages not yet delivered to this user
    const pendingMessages = allMessages.filter(
      (msg) => !msg.deliveredTo.includes(username),
    );

    client.emit('previous-messages', pendingMessages);

    // mark them as delivered
    pendingMessages.forEach((msg) => {
      msg.deliveredTo.push(username);
    });
  }

  @SubscribeMessage('room-message')
  handleMessage(client: Socket, data: MessagePayload) {
    const { room, username, message } = data;

    if (!this.roomMessages[room]) {
      this.roomMessages[room] = [];
    }

    const msg: ChatMessage = {
      senderId: client.id,
      username,
      message,
      deliveredTo: [username], // sender already saw it
    };

    this.roomMessages[room].push(msg);

    this.server.to(room).emit('message', msg);
  }
}
