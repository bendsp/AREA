import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutJsonService {
    getAboutJson(): any{
        return {
            "client" : {
                // I need to get the host IP address of the client here
                "host": "localhost",
            },
            "server" : {
                "current_time": Date.now(),
                "services": [
                    {
                        "name": "Time",
                        "actions": [],
                        "reactions": []
                    }, 
                    {
                        "name": "Outlook",
                        "actions": [] ,
                        "reactions": []
                    }
                ]
            }
        }
    }
}
