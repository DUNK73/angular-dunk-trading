import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/model/transaction';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.less']
})
export class TransactionsComponent implements OnInit {

  public data: Array<Transaction> = [];

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let transactionsDbRef = this.databaseService
      .database
      .ref("transactions")
      .once("value")
      .then((snapshot) => {

        let list = snapshot.forEach((childSnapshot) => {
          this.data.push(childSnapshot.val());
        });

      });
  }

  public add() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute
    });
  }

}
