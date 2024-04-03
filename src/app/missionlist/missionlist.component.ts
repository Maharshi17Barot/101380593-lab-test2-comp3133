import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  year: string = ''; // Initialized as an empty string

  constructor(private spacexapiService: SpacexapiService) {}

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    this.spacexapiService.getMissions().subscribe((missions) => {
      this.missions = missions;
      this.filteredMissions = missions; // Initially, filteredMissions will show all missions
    });
  }

  filterByYear(): void {
    if (this.year.trim()) {
      // Use trim() to remove any leading/trailing whitespace
      this.filteredMissions = this.missions.filter(
        (mission) => mission.launch_year.toString() === this.year.trim()
      );
    } else {
      this.filteredMissions = this.missions;
    }
  }
}
