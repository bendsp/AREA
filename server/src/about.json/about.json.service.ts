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
    async getAboutJson(): Promise<AboutJson>{
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
                            "description": "When time is reached in selected city",
                            "params" : [{
                                "name" : "time",
                                "type" : "string"
                            },{
                                "name" : "city",
                                "type" : "string"
                            }]
                        }],
                        "reactions": []
                    }, 
                    {
                        "name": "Gmail",
                        "actions": [] ,
                        "reactions": [{
                            "name": "send_email",
                            "description": "Send an email to the destination email address with subject and body",
                            "params": [{
                                "name": "email",
                                "type": "string"
                                },{
                                "name": "subject",
                                "type": "string"
                                },{
                                "name": "message",
                                "type": "string"
                            }]
                        }]
                    },
                    {
                        "name": "SendRandomPokemon",
                        "actions": [] ,
                        "reactions": [{
                            "name": "send_random_pokemon",
                            "description": "Send an email to the destination email address with a random pokemon",
                            "params": [{
                                "name": "email",
                                "type": "string"
                            }]
                        }]
                    }
                ]
            }
        }
    }
}
