import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'net';

import { UsersService, connectedUserPoint } from 'src/users/users.service';

@WebSocketGateway(80, {path:'/api/sharedPoints'})
export class SharedPointsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server: Server;
  wsClients:any=[];

  constructor(private usersService:UsersService){}
  afterInit(server: any) {
    console.log('after init')
  }
  handleConnection(client: any) {

  }
  
  handleDisconnect(client) {
    console.log(
        'disconnection: '
        + this.usersService.connectedUsersPoints[client?.['client']?.['conn']?.['id']]?.first_name
        + ' '
        + this.usersService.connectedUsersPoints[client?.['client']?.['conn']?.['id']]?.last_name 
      )
    delete this.usersService.connectedUsersPoints[client?.['client']?.['conn']?.['id']]
  }
  @SubscribeMessage('sendOwnPoints')
  handlePoints( @ConnectedSocket() socket: any, @MessageBody() payload: connectedUserPoint): any {
    this.usersService.connectedUsersPoints[socket?.['client']?.['conn']?.['id']] = payload 
    console.log('sharedPoints'+Object.keys(this.usersService.connectedUsersPoints))
    this.server.emit("sharedPoints",this.usersService.connectedUsersPoints)
  }
}
