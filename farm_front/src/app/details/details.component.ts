import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  public paramFarmId: number = 0

  constructor(
    private route: ActivatedRoute,
    private farmService: FarmService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.paramFarmId = +this.route.snapshot.paramMap.get('farmId')!
    this.farmService.list().subscribe((response) => {
      if (!this.isValidParamFarmId(response)) this.router.navigateByUrl('/')
    })
  }

  deleteFarm(): void {
    const confirmed = confirm('Are you sure you want to delete?')
    if (confirmed) {
      this.farmService.delete(this.paramFarmId).subscribe(() => {
        this.router.navigateByUrl('/').then(() => {
          this.toastr.success('Farm deleted successfully!', 'Success', {
            positionClass: 'toast-bottom-left'
          })
        })
      })
    }
  }

  isValidParamFarmId(response: any): boolean {
    return response.some((data: any) => data.id === this.paramFarmId)
  }
}
