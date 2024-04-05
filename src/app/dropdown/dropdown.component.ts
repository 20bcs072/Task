// import { Component, OnInit } from '@angular/core';
// import { LazyLoadEvent } from 'primeng/api';
// import { ScrollerOptions, SelectItem } from 'primeng/api';
// import { LoginServiceService } from '../login-service.service';
// import { TableLazyLoadEvent } from 'primeng/table';

// @Component({
//   selector: 'app-dropdown',
//   templateUrl: './dropdown.component.html',
//   styleUrl: './dropdown.component.css'
// })
// export class DropdownComponent implements OnInit {

//   items: SelectItem[];
// title: any;
// skip:number=0;
//   selectedItem: string | undefined;

//   loading: boolean = false;
//   totalRecords: any=26;
//   last: any = 5;
//   loadLazyTimeout = null;

//   ngOnInit(): void {

//     const event: LazyLoadEvent = {
//       first: 0,
//       rows:26
//     };
//     this.loadOptions(event);
    
//   }

  

//   options: ScrollerOptions = {
//       delay: 250,
//       showLoader: true,
//       lazy: true,
//       onLazyLoad: this.onLazyLoad.bind(this)
//   };

//   constructor(private login:LoginServiceService) {
//       this.items = [];
//       for (let i = 0; i < 10000; i++) {
//           this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
//       }
//   }
//   loadOptionsLazy(event: TableLazyLoadEvent) {
//     this.loading = true;
 
//     this.login.loadOptions(event.first, event.last)
//       .subscribe(response => {
//         this.options = response;
   
//         this.loading = false;
//       });
//   }
//   onLazyLoad(event:any) {
//       this.loading = true;

//       if (this.loadLazyTimeout) {
//           clearTimeout(this.loadLazyTimeout);
//       }

//       //imitate delay of a backend call
//       setTimeout(() => {
//           const { first, last } = event;
//           const items = [...this.items];

//           // for (let i = first; i < last; i++) {
//           //     items[i] = { label: `Item #${i}`, value: i };
//           // }

//           // this.items = items;
//           // this.loading = false;

//           this.loadOptions(event);
//       }, Math.random() * 1000 + 250);
//   }

//   loadOptions(event: LazyLoadEvent) {
//     this.loading = true;
//     const a=event.rows||this.totalRecords;
 
//     this.login.getTitle(this.skip, a)
//       .subscribe(response => {
//         this.title = response;
     
//      console.log(response);
//         this.loading = false;
//       });
 
 
//     }




import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LoginServiceService } from '../login-service.service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  // title: any;
  // selectedItem: string | undefined;
  loading: boolean = false;
  totalRecords: number = 0;
  title: string[] = [];
  displayedtitle: string[] = [];
  startSliceIndex = 0;
  sliceSize = 4;

  constructor(private login: LoginServiceService) { }

  ngOnInit(): void {
    this.fetchAlltitle();
  }
 
  fetchAlltitle(): void {
    this.login.getTitles().subscribe((title: string[]) => {   
      this.title = title;
   
      this.updateDisplayedtitle();
    });
  }
 
  updateDisplayedtitle(): void {
    this.displayedtitle = this.title.slice(0, this.startSliceIndex + this.sliceSize);
    console.log(this.displayedtitle);
  }
 
  onScroll(event: any): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom) {
      this.startSliceIndex += this.sliceSize;
      this.updateDisplayedtitle();
    }
  }
  
}
 


