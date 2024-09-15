import { Request, Response } from "express";
import { Country, State, City } from "country-state-city";

export const getAllCountries = async (_req: Request, res: Response) => {
  const countries = Country.getAllCountries();
  if (countries) return res.json(countries);
};

export const getCountryStates = async (req: Request, res: Response) => {
  const { countryCode } = req.params || {};
  console.log({ p: req.params });
  const states = State.getStatesOfCountry(countryCode);
  if (states) return res.json(states);
};

export const getStateCities = async (req: Request, res: Response) => {
  const { countryCode, stateCode } = req.params || {};
  console.log({ p: req.params });
  const cities = City.getCitiesOfState(countryCode, stateCode);
  if (cities) return res.json(cities);
};
