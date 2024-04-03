import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  year: string = ''; // For year filter
  launchSuccess: string | undefined; // Allow undefined
  landSuccess: string | undefined; // Allow undefined

  constructor(private spacexapiService: SpacexapiService) {}

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    this.spacexapiService.getMissions().subscribe((missions) => {
      this.missions = missions;
      this.filterByYear(); // Call filter method to apply initial filters if any
    });
  }

  filterByYear(): void {
    let filtered = this.missions;

    if (this.year.trim()) {
      filtered = filtered.filter(mission => mission.launch_year.toString() === this.year.trim());
    }

    if (this.launchSuccess !== undefined) {
      const isSuccess = this.launchSuccess === 'true';
      // Make sure mission.launch_success exists in your model
      filtered = filtered.filter(mission => mission.launch_success?.toString() === this.launchSuccess);
    }

    if (this.landSuccess !== undefined) {
      const isSuccess = this.landSuccess === 'true';
      filtered = filtered.filter(mission =>
        mission.rocket.first_stage?.cores[0]?.land_success?.toString() === this.landSuccess
      );
    }

    this.filteredMissions = filtered;
  }

  resetFilters(): void {
    this.year = '';
    this.launchSuccess = undefined;
    this.landSuccess = undefined;
    this.filteredMissions = this.missions;
  }
}
