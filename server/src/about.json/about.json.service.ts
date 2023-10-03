import { Injectable } from '@nestjs/common';
import { Service } from './about.json.interfaces';

interface AboutJson {
    client: {
        host: string;
    };
    server: {
        current_time: number;
        services: Service[];
    };
}

@Injectable()
export class AboutJsonService {
    getAboutJson(): AboutJson{
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
                        "actions": ["timer:get_city_time"],
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
