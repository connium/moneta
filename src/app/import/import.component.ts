import { Component, EventEmitter, Output } from '@angular/core';
import { IncomeService } from '../income/income.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  @Output() import = new EventEmitter<void>();

  constructor(private incomeService: IncomeService) { }

  public dragOver(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    (event as any).dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  public drop(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    // event.dataTransfer.files holds a list of all dropped files
    const files = (event as any).dataTransfer.files;

    if (files.length === 0 || files[0].name.endsWith('.json') === false) {
      return;
    }

    const file = files[0];

    const reader = new FileReader();
    reader.onload = ((theFile) => {
      return function (e) {
        this.incomeService.import(e.target.result);
        this.import.emit();
      }.bind(this);
    })(file);

    reader.readAsText(file, 'utf8');
  }
}
