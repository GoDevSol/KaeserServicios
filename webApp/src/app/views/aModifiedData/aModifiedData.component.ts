import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  templateUrl: 'aModifiedData.component.html'
})
export class AModifiedDataComponent implements OnInit {

  constructor(private router: Router) { }

  radioModel: string = 'Month';

  
  async ngOnInit() {  
    return 0;    
  }
}
