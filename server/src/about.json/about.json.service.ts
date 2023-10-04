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
                        "actions": [{
                            "name":"get_city_time",
                            "description": "Get the current time of a city"
                        }],
                        "reactions": []
                    }, 
                    {
                        "name": "gmail",
                        "actions": [] ,
                        "reactions": [{
                            "name": "send_email",
                            "description": "Send an email to the destination email address with subject and body"
                        }]
                    }
                ]
            }
        }
    }
}
