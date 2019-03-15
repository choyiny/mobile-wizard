import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WizardAPIService {

  private endpoint = environment.backend;

  constructor(
    private http: HttpClient
  ) { }

}
