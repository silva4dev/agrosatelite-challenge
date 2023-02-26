import { FarmService } from './../services/farm.service'
import { Component, OnInit } from '@angular/core'
import { Owner } from '../models/Owner'
import { OwnerService } from '../services/owner.service'
import { MapService } from '../map.service'
import * as turf from '@turf/turf'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.scss'],
})
export class FarmFormComponent implements OnInit {
  public name: string = ''
  public owner_id!: number
  public owners: Owner[] = []
  public area: number = 0
  public centroid: number[] = []
  public formatCentroId: string = ''
  public formatArea: string = ''
  public farmForm!: FormGroup
  public isEdit: boolean = false
  public farm!: any
  public farmIdUpdate: number = 0

  constructor(
    private ownerService: OwnerService,
    private _mapService: MapService,
    private farmService: FarmService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.getMapInfo() })
    this.getOwners()
    this.farmForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      owner_id: ['', Validators.required],
    })
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.farmService.read(+params['id']).subscribe(farm => {
          this.farmIdUpdate = farm.id
          this.name = farm.name
          this.area = farm.area
          this.owner_id = farm.owner_id
          this.centroid = farm.centroid
          this.formatArea = this.setFormatArea(this.area)
          this.formatCentroId = this.setFormatCentroId(this.centroid)
          this.isEdit = true
        })
      }
    })
  }

  getMapInfo() {
    const extent = this._mapService.map.getMap().getView().calculateExtent(this._mapService.map.getMap().getSize())
    const polygon = turf.bboxPolygon(extent)
    this.area = turf.area(polygon)
    this.centroid = turf.centroid(polygon).geometry.coordinates
    this.formatCentroId = this.setFormatCentroId(this.centroid)
    this.formatArea = this.setFormatArea(this.area)
  }

  setFormatArea(area: number): string {
    if (area < 10000) return area.toFixed(2) + ' m²'
    const hectares = area / 10000
    return hectares.toFixed(2) + ' ha'
  }

  setFormatCentroId(centroid: number[]): string {
    return centroid.join(", ")
  }

  createFarm() {
    if (this.farmForm.invalid) {
      Object.keys(this.farmForm.controls).forEach(key => {
        this.farmForm.get(key)!.markAsDirty()
        this.farmForm.get(key)!.markAsTouched()
      })
    } else {
      this.farmService.create({
        owner_id: +this.owner_id,
        name: this.name,
        area: +this.area,
        centroid: this.centroid,
      }).subscribe(() => {
        this.router.navigateByUrl('/').then(() => {
          this.toastr.success('Farm created successfully!', 'Success', {
            positionClass: 'toast-bottom-left'
          })
        })
      })
    }
  }

  updateFarm() {
    if (this.farmForm.invalid) {
      Object.keys(this.farmForm.controls).forEach(key => {
        this.farmForm.get(key)!.markAsDirty()
        this.farmForm.get(key)!.markAsTouched()
      })
    } else {
      this.farmService.update({
        id: this.farmIdUpdate,
        owner_id: + this.owner_id,
        name: this.name,
        area: +this.area,
        centroid: this.centroid,
      }).subscribe(() => {
        this.router.navigateByUrl('/').then(() => {
          this.toastr.success('Farm updated successfully!', 'Success', {
            positionClass: 'toast-bottom-left'
          })
        })
      })
    }
  }

  getOwners() {
    this.ownerService.list().subscribe((response) => this.owners = response)
  }
}

