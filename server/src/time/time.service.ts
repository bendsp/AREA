import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TimeService {
constructor(private readonly httpService: HttpService) {}

    async getCurrentTimeByCity(cityName: string): Promise<string> {
        // Step 1: Get coordinates for the city using the Geocoding API
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyAegpW4OTClidwljwK8RL0GqFXKJ_jrpGY`;
        const geocodingResponse = await this.httpService.get(geocodingUrl).toPromise();
        const { results } = geocodingResponse.data;
        
        if (!results || results.length === 0) {
            throw new Error('City not found.' + geocodingResponse.data.error_message);
        }
        Logger.log(results);
        const location = results[0].geometry.location;
        Logger.log(location);
        // Step 2: Get time zone information for the coordinates
        const timeZoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=AIzaSyAegpW4OTClidwljwK8RL0GqFXKJ_jrpGY`;
        Logger.log(timeZoneUrl);
        const timeZoneResponse = await this.httpService.get(timeZoneUrl).toPromise();
        Logger.log(timeZoneResponse.data);
        
        // Step 3: Calculate the current time in the city
        const currentTime = new Date();

        // Calculate the total offset, including rawOffset and dstOffset
        const totalOffsetSeconds = timeZoneResponse.data.rawOffset + timeZoneResponse.data.dstOffset;

        // Apply the total offset to the current time
        currentTime.setTime(currentTime.getTime() + totalOffsetSeconds);

        // Format the timestamp using Intl.DateTimeFormat with the city's time zone
        const formattedTime = currentTime.toLocaleString(undefined, {
        timeZone: timeZoneResponse.data.timeZoneId,
        });

        return `Current time in ${cityName}: ${formattedTime}`;
    }
}