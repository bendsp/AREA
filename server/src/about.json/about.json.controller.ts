import { Controller,Get, Logger } from '@nestjs/common';
import { AboutJsonService } from './about.json.service';

@Controller('about.json')
export class AboutJsonController {
    constructor(private readonly aboutJsonService: AboutJsonService) {}
    
    @Get()
    async getAboutJson(): Promise<any> {
        return this.aboutJsonService.getAboutJson();
    }
}
