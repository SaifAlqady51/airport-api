import { IsNotEmpty } from 'class-validator';

export class CreateAirportDto {
  id: string;

  @IsNotEmpty()
  airportName: string;

  @IsNotEmpty()
  airportCode: string;

  @IsNotEmpty()
  cityName: string;

  @IsNotEmpty()
  countryName: string;
}
