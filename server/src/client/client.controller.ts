import { Body, Controller, Param } from '@nestjs/common';
import { Get,Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientData } from './client.interface';
import { Status } from 'src/main';
import { User } from 'src/db/db.interface';

@Controller('client')
export class ClientController {
    constructor(readonly clientService: ClientService) {}

    @Post('new-user')
    public async newUser(@Body() body: User): Promise<Status> {
        return await this.clientService.newUser(body);
    }

    @Post('user/:id')
    public async getUser(@Param('id') id: number): Promise<User> {
        return await this.clientService.getUser(id.toString());
    }

    @Post('new-node')
    public async newNode(@Body() body: ClientData): Promise<Status> {
        return await this.clientService.newNode(body);
    }

    @Get('all-nodes/:id')
    public async allNodes(@Param('id') id: number): Promise<ClientData[]> {
        return await this.clientService.getAllNodes(id.toString());
    }
}
