import { Test, TestingModule } from '@nestjs/testing';
import { TimeService } from './time.service';
import { HttpService, HttpModule } from '@nestjs/axios';
import { AxiosResponse } from 'axios'; // Import AxiosResponse
import { of } from 'rxjs';

describe('TimeService', () => {
  let timeService: TimeService;
  let httpService: HttpService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TimeService],
    }).compile();

    timeService = module.get<TimeService>(TimeService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(timeService).toBeDefined();
  });

  it('should retrieve the current time for a city', async () => {
    // Mock the HTTP service's get method
    const mockHttpServiceGet = jest.spyOn(httpService, 'get');
    const mockGeocodingResponse: AxiosResponse = {
      data: {
        results: [
          {
            geometry: {
              location: {
                lat: 40.7128,
                lng: -74.0060,
              },
            },
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: { // Add a minimal headers object
        'content-type': 'application/json',
      },
      config: {
        url: 'mock-url',
        headers: undefined
      }, // Add a minimal config object
    };
    const mockTimeZoneResponse: AxiosResponse = {
      data: {
        rawOffset: -18000,
        dstOffset: 0,
        timeZoneId: 'America/New_York',
      },
      status: 200,
      statusText: 'OK',
      headers: { // Add a minimal headers object
        'content-type': 'application/json',
      },
      config: {
        url: 'mock-url',
        headers: undefined
      }, // Add a minimal config object
    };

    // Configure the mock responses
    mockHttpServiceGet.mockReturnValueOnce(of(mockGeocodingResponse));
    mockHttpServiceGet.mockReturnValueOnce(of(mockTimeZoneResponse));

    // Calculate the expected time for New York
    const currentTime = new Date();
    currentTime.setTime(currentTime.getTime() - 18000 * 1000);

    const formattedTime = currentTime.toLocaleString(undefined, {
      timeZone: 'America/New_York',
    });

    // Call the method and assert the result
    const cityName = 'New York';
    const result = await timeService.getCurrentTimeByCity(cityName);
    expect(result).toBe(formattedTime);

    // Verify that the HTTP service's get method was called with the expected URLs
    expect(mockHttpServiceGet).toHaveBeenCalledWith(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}`,
    );
    expect(mockHttpServiceGet).toHaveBeenCalledWith(
      `https://maps.googleapis.com/maps/api/timezone/json?location=40.7128,-74.006&timestamp=${Math.floor(
        currentTime.getTime() / 1000,
      )}`,
    );
  });
});