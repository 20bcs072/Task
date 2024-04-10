import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Home } from './home';
import { Title } from '@angular/platform-browser';
import { Report } from './report';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  a:string='';
  b:string='';


  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }
  
  login(credentials: {username: string, password: string}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:5215/api/Auth', credentials, { headers, responseType: 'text' });
  
}


// baseApiUrl:string="https://localhost:5215";


  getAllHouses():Observable<Home[]>
  {
    return this.http.get<Home[]>('http://localhost:5215/products')

  }
  getcount(){
    return this.http.get('http://localhost:5215/count');
  }

  getallProducts(skip:number,sortfield:any,sortorder:number,take:number,idFilter:string|null,titleFilter:string|null,priceFilter:string|null,authorFilter:string|null,editionFilter:string|null, DateFilter: Date|null, filterUser:string|null):Observable<Home[]>
  {
  
    if (idFilter) {
    this.a='&idFilter='+idFilter;
  }

  if (titleFilter) {
    this.a='&titleFilter='+titleFilter;
  }

  if (priceFilter) {
    this.a='&priceFilter='+priceFilter;
  }

  if (authorFilter) {
    this.a='&authorFilter='+authorFilter;
  }
  if (editionFilter) {
    this.a='&editionFilter='+editionFilter;
  }
  if (DateFilter) {
    this.a='&DateFilter='+DateFilter;
  }
  
  if(filterUser){
    this.b= '&filterTerm='+filterUser;
   }
    if(sortorder==-1){
      const url=this.http.get<Home[]>('http://localhost:5215/pro?skip='+skip+'&take='+take+'&orderByColumn='+sortfield+'&isAscending=false'+ this.a +this.b);
      this.a='';
      this.b='';
      return url;
    }
    else{
      const url=this.http.get<Home[]>('http://localhost:5215/pro?skip='+skip+'&take='+take+'&orderByColumn='+sortfield+'&isAscending=true'+ this.a +this.b);
      this.a='';
      this.b='';
      return url;
    }
     
  }
  loadOptions(skip:any,take:any){
    return this.http.get('http://localhost:5215/pro?orderByColumn=title&isAscending=true'+skip+'&take='+take);
  }

  getTitle(skip:number,take:number):Observable<Title>
  {
    return this.http.get<Title>('http://localhost:5215/drop?skip='+skip+'&take='+take);
  }
  getTitles():Observable<string[]>
  {
    return this.http.get<string[]>('http://localhost:5215/title');
  }
  addProduct(addItemRequest:Home):Observable<Home[]>
  {
  
    return this.http.post<Home[]>('http://localhost:5215/products',addItemRequest);

  }
  // addReport(addReport:Report):Observable<Report[]>{
    
  //   return this.http.post<Report[]>('http://localhost:5215/AddReport',addReport);
  // }

  addReport(addRequest:Report)
  {
 
    addRequest.reportID=0;
    return this.http.post<Report[]>('http://localhost:5215/AddReport', addRequest);
    //this.http.post(this.baseApiUrl+'/api/Log/InsertLo',addRequest)
  }
 





  getAllReport():Observable<Report[]> {

    return this.http.get<Report[]>('http://localhost:5215/ReportDetails');

  }

}
