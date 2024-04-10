import { Component, ElementRef, OnInit } from '@angular/core';
import { Home } from '../home';
import { LoginServiceService } from '../login-service.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { LazyLoadEvent, ScrollerOptions } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-lazy-load',
  templateUrl: './lazy-load.component.html',
  styleUrl: './lazy-load.component.css'
})
export class LazyLoadComponent implements OnInit {

  totalRecords:any;
  houses:Home[]=[];
  loadLazyTimeout: any;
  constructor (private lazyService:LoginServiceService,private elementRef: ElementRef, private router:Router,private http: HttpClient,private datePipe: DatePipe)  {
    this.items = [];
    for (let i = 0; i < 10000; i++) {
        this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }

    
  }
 
  redirectToComponent(): void {
    this.router.navigate(['create']); 
  }
  redirectToReport(): void {
    this.router.navigate(['report']); 
  }
  loading: boolean = true;
 
 
 skip=0;
 take=5;
  selectAll: boolean = false;
 
  selectedCustomers!: Home[];
 

  idFilter: any= '';
  titleFilter: any = '';
  priceFilter: any = '';
  authorFilter: any = '';
  editionFilter: any = '';
  DateFilter: any='';
  globalFilter:any='';

  items: any;
  title: any;

    selectedItem: string | undefined;
  
    loading1: boolean = false;
   
    last: any = 5;
    loadLazyTimeout1 = null;

    
  options: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onLazyLoad.bind(this)
};
  
 
  ngOnInit() {
    const event: LazyLoadEvent = {
      first: 0,
      rows:26
    };
    this.lazyService.getcount().subscribe(
      (response) => {
          this.totalRecords=response;
      }
    );
    
    this.loadOptions(event);
    
  }

  loadOptionsLazy(event: TableLazyLoadEvent) {
    this.loading = true;
 
    this.lazyService.loadOptions(event.first, event.last)
      .subscribe(response => {
        this.options = response;
   
        this.loading = false;
      });
  }
  onLazyLoad(event:any) {
      this.loading = true;

      if (this.loadLazyTimeout) {
          clearTimeout(this.loadLazyTimeout);
      }


      setTimeout(() => {
          const { first, last } = event;
          const items = [...this.items];

          for (let i = first; i < last; i++) {
              items[i] = { label: `Item #${i}`, value: i };
          }

          this.items = items;
          this.loading = false;
      }, Math.random() * 1000 + 250);
  }

  loadOptions(event: LazyLoadEvent) {
    this.loading = true;
    const a=event.rows||this.totalRecords;
 
    this.lazyService.getTitle(this.skip, a)
      .subscribe(response => {
        this.title = response;
     
     console.log(response);
        this.loading = false;
      });
 
 
    }



  onIDFilterChange(event: any) {
    const value = (event.target as HTMLInputElement)?.value;
    if (value !== undefined) {
        this.idFilter = value;
        const event: TableLazyLoadEvent = {
            first: 0,
            sortField: '',
            sortOrder: 1
        };
        this.getUsers(event);
    }
}
 
onTitleFilterChange(event: any) {
  const value = (event.target as HTMLInputElement)?.value;
  if (value !== undefined) {
      this.titleFilter = value;
      const event: TableLazyLoadEvent = {
          first: 0,
          sortField: '',
          sortOrder: 1
      };
      this.getUsers(event);
  }
}
 
onPriceFilterChange(event: any) {
  const value = (event.target as HTMLInputElement)?.value;
  if (value !== undefined) {
      this.priceFilter = value;
      const event: TableLazyLoadEvent = {
          first: 0,
          sortField: '',
          sortOrder: 1
      };
      this.getUsers(event);
  }
}
 
onAuthorFilterChange(event: any) {
  const value = (event.target as HTMLInputElement)?.value;
  if (value !== undefined) {
      this.authorFilter = value;
      const event: TableLazyLoadEvent = {
          first: 0,
          sortField: '',
          sortOrder: 1
      };
      this.getUsers(event);
  }
}
onEditionFilterChange(event: any) {
  const value = (event.target as HTMLInputElement)?.value;
  if (value !== undefined) {
      this.editionFilter = value;
      const event: TableLazyLoadEvent = {
          first: 0,
          sortField: '',
          sortOrder: 1
      };
      this.getUsers(event);
  }
}

onDateFilterChange(event: any) {
  const value = (event.target as HTMLInputElement)?.value;
  if (value !== undefined) {
      this.DateFilter = value;
      const event: TableLazyLoadEvent = {
          first: 0,
          sortField: '',
          sortOrder: 1
      };
      this.getUsers(event);
  }
}
 
  getUsers(event: TableLazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
    this. lazyService.getallProducts(event.first || 0, event.sortField, event.sortOrder||0, this.take, this.idFilter, this.titleFilter, this.priceFilter, this.authorFilter, this.editionFilter, this.DateFilter, this.globalFilter).subscribe(
        (response) => {
          this.houses = response;
          this.loading=false;
        }
      );
    }, 1000);
  }
  filterUser(){
   
    const event: TableLazyLoadEvent = {
      first: 0,
      sortField: '',
      sortOrder: 1
    };
   
    this.getUsers(event);
  }

  clearFilters() {
 
    this.idFilter = '';
    this.titleFilter = '';
    this.priceFilter = '';
    this.authorFilter = '';
    this.editionFilter='';
    this.globalFilter = '';
 
 
    const inputFields = this.elementRef.nativeElement.querySelectorAll('input[type="text"]');
    inputFields.forEach((input: HTMLInputElement) => {
      input.value = '';
    });
 
   
    const event: TableLazyLoadEvent = {
      first: 0,
      sortField: '',
      sortOrder: 1
    };
  this.getUsers(event);
  }
  
  downloadExcel(): void {
    this.http.get('http://localhost:5215/api/Excel', { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'report_data.xlsx';
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  }

  
}
