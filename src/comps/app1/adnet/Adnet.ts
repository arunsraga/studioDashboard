import {Component, OnInit} from '@angular/core';
import {AdnetConfigCustomer} from "./config/AdnetConfigCustomer";
import {Tabs} from "../../tabs/tabs";
import {Tab} from "../../tabs/tab";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../adnet/AdnetCustomerModel";
import {List} from "immutable";

@Component({
    selector: 'Adnet',
    directives: [AdnetConfigCustomer, Tabs, Tab],
    template: `
        <br/>
        <tabs>
            <tab [tabtitle]="'Configuration'">
              <AdnetConfigCustomer [adnetCustomerModel]="adnetCustomerModel">
              </AdnetConfigCustomer>
            </tab>
            <tab [tabtitle]="'Network'">
              <h3>network coming soon...</h3>
            </tab>
            <tab [tabtitle]="'Billing'">
              <h3>billing coming soon...</h3>
            </tab>
        </tabs>
        
    `
})
export class Adnet {
    constructor(private appStore: AppStore) {
        this.adnetCustomerId = this.appStore.getState().appdb.get('adnetCustomerId');

        var i_adnet = this.appStore.getState().adnet;
        this.adnetCustomers = i_adnet.getIn(['customers']);
        this.unsub = this.appStore.sub((i_adnetCustomers: List<AdnetCustomerModel>) => {
            this.adnetCustomers = i_adnetCustomers
            this.getCustomerData();
        }, 'adnet.customers');
        this.getCustomerData();
    }

    private unsub: Function;
    private adnetCustomerId: number;
    private adnetCustomers: List<AdnetCustomerModel>
    private adnetCustomerModel: AdnetCustomerModel;

    private getCustomerData() {
        if (!this.adnetCustomers)
            return;
        this.adnetCustomers.forEach((i_adNetCustomer:AdnetCustomerModel)=>{
            var adnetCustomerId = i_adNetCustomer.customerId();
            if (adnetCustomerId==this.adnetCustomerId){
                this.adnetCustomerModel = i_adNetCustomer;
            }
        })
    }

    private ngOnDestroy() {
        this.unsub();
    }
}