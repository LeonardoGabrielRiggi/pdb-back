import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    connectedUsersPoints:{[key:string]:connectedUserPoint} = {}
}

export interface connectedUserPoint {
    user_id:string;
    first_name?:string,
    last_name?:string,
    profile_picture?:string;
    lat:number,
    lgt:number,
}