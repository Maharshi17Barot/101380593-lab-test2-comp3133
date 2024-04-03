export interface Core {
  land_success?: boolean;
}

export interface FirstStage {
  cores: Core[];
}

export interface Rocket {
  rocket_name: string;
  rocket_type: string;
  first_stage?: FirstStage; // Add this property to represent the first stage of the rocket
}

export interface Mission {
  flight_number: number;
  mission_name: string;
  launch_year: number;
  launch_success?: boolean;
  rocket: Rocket;
  launch_site: {
    site_name_long: string;
  };
  links: {
    mission_patch_small: string;
  };
  details: string;
}
