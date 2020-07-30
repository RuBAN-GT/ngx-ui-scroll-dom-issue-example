import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Datasource } from 'ngx-ui-scroll';
import { lorem, random } from 'faker';
import * as Mark from 'mark.js';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  public readonly datasource: Datasource;
  public readonly search: FormControl;

  @ViewChild('viewport', { static: true }) public viewportContent: ElementRef;
  private mark: Mark;
  private markOptions: Mark.MarkOptions = {
    className: 'mark',
    caseSensitive: false,
  };
  private store: any[] = [];

  constructor() {
    this.datasource = new Datasource({
      get: this.getNextData.bind(this),
      settings: {
        startIndex: 0,
        minIndex: 0,
        bufferSize: 32,
      }
    });
    this.search = new FormControl('');
  }

  public ngOnInit(): void {
    this.generateMockStore();
    this.mark = new Mark(this.viewportContent.nativeElement);
    this.search.valueChanges.subscribe((value) => {
      this.highlight(value);
    });
  }

  public async generateMockStore(): Promise<void> {
    const collectionCount = random.number({ min: 100, max: 200 });
    this.store = Array(collectionCount).fill(null).map((_, index) => ({
      id: index,
      name: lorem.words(3)
    }));
    await this.datasource.adapter.reload();
  }

  public async makeMutation(): Promise<void> {
    await this.datasource.adapter.fix({
      updater: ({ data }) => {
        data.name = `${data.name}+`;
      },
    });
  }

  private async getNextData(index: number, count: number): Promise<any[]> {
    if (index > this.store.length) {
      return [];
    }

    return this.store.slice(index, index + count);
  }

  private highlight(keyword: string = null): void {
    if (!this.mark) {
      return;
    }

    this.mark.unmark(this.markOptions);
    if (keyword) {
      this.mark.mark(keyword, this.markOptions);
    }
  }
}
