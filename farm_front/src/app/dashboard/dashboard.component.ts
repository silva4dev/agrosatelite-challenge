import { Component, OnInit } from '@angular/core'
import { Farm } from '../models/Farm'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  allFarms: Farm[] = []
  farms: Farm[] = []
  pageSize: number = 10
  totalItems: number = 0
  currentPage: number = 1
  totalPages: number = 0
  searchFarm: string = ''

  constructor(private farmService: FarmService) { }

  ngOnInit(): void {
    this.getFarms()
  }

  getFarms(searchFarm?: string): void {
    this.farmService.list().subscribe(response => {
      this.allFarms = response
      if (searchFarm) {
        searchFarm = searchFarm.trim()
        this.allFarms = this.allFarms.filter(farm => farm.name.toLowerCase().includes(searchFarm!.toLowerCase()))
      }
      this.totalItems = this.allFarms.length
      this.totalPages = Math.ceil(this.totalItems / this.pageSize)
      this.currentPage = 1
      this.getFarmsForPage()
    })
  }

  getFarmsForPage(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize
    const endIndex = startIndex + this.pageSize
    this.farms = this.allFarms.slice(startIndex, endIndex)
  }

  searchFarms(): void {
    this.getFarms(this.searchFarm)
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getFarmsForPage()
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.getFarmsForPage()
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.getFarmsForPage();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.getFarmsForPage();
  }

  getPageRange(): number[] {
    const rangeSize = 3
    const rangeStart = Math.max(1, this.currentPage - rangeSize)
    const rangeEnd = Math.min(this.totalPages, this.currentPage + rangeSize)
    return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart)
  }
}