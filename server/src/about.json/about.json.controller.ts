import { Controller,Get } from '@nestjs/common';
import { AboutJsonService } from './about.json.service';

@Controller('about.json')
export class AboutJsonController {
    constructor(private readonly aboutJsonService: AboutJsonService) {}
    
    @Get()
    getAboutJson(): any {
        return this.aboutJsonService.getAboutJson();
    }
}
