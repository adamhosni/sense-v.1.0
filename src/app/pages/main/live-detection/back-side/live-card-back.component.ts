import { Component, OnDestroy } from '@angular/core';
import { PieChart, EarningData } from '../../../../@core/data/live-detection';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-live-card-back',
  styleUrls: ['./live-card-back.component.scss'],
  templateUrl: './live-card-back.component.html',
})
export class LiveCardBackComponent implements OnDestroy {
  private alive = true;

  earningPieChartData: PieChart[];
  name: string;
  color: string;
  value: number;
  defaultSelectedCurrency: string = 'Bitcoin';

  constructor(private earningService: EarningData ) {
    this.earningService.getEarningPieChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningPieChartData) => {
        this.earningPieChartData = earningPieChartData;
      });
  }

  changeChartInfo(pieData: {value: number; name: string; color: any}) {
    this.value = pieData.value;
    this.name = pieData.name;
    this.color = pieData.color;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
