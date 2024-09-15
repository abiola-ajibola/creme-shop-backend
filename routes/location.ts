import { Router } from "express";
import { getAllCountries } from "../controllers";
import { getCountryStates } from "../controllers";

const locationRouter = Router();

locationRouter.get("/countries", getAllCountries);
locationRouter.get("/:countryCode", getCountryStates);
locationRouter.get("/:countryCode/:stateCode", getCountryStates);

export { locationRouter };
