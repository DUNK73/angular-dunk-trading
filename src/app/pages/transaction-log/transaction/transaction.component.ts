import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutParametersType } from 'src/app/model/rout-parameters-type';
import { Transaction } from 'src/app/model/transaction';
import { DatabaseService } from '../../../services/database.service';



@Component({
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public detailForm: FormGroup = new FormGroup({
    id: new FormControl(),
    date: new FormControl(),
    ticker: new FormControl(),
    rationaleForEntry: new FormControl(),
    marketCondition: new FormControl(),
    patternNumber: new FormControl(),
    volumeAvailability: new FormControl(),
    wayOut: new FormControl(),
    evaluationOfEntrance: new FormControl(),
    maxPossibleProfitFactor: new FormControl(),
    transactionResult: new FormControl(),
    deposit: new FormControl(),
    mistakes: new FormControl(),
  })

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.params.id as RoutParametersType;

    if (id !== 'add') {
      let transactionsDbRef = this.databaseService
        .database
        .ref("transactions/" + id)
        .once("value");

      transactionsDbRef
        .then((snapshot) => {
          this.detailForm.patchValue(snapshot.val());
        });
    }


    // let newTransactionRef = transactionsDbRef.push();

    // newTransactionRef
    //   .set({
    //     id: newTransactionRef.key,
    //     date: new Date(),
    //     ticker: 'string',
    //     rationaleForEntry: 'string',
    //     marketCondition: 'string',
    //     patternNumber: 1,
    //     volumeAvailability: 'string',
    //     wayOut: 'string',
    //     evaluationOfEntrance: 'string',
    //     maxPossibleProfitFactor: 'string',
    //     transactionResult: 1,
    //     deposit: 1,
    //     mistakes: 'string',

    //   } as Transaction);

  }

  public save() {

    let entity: Transaction = this.detailForm.value;

    if (entity.id) {

      let transactionsDbRef = this.databaseService
        .database
        .ref("transactions/" + entity.id);

      transactionsDbRef.update(entity);

    } else {
      let transactionsDbRef = this.databaseService
        .database
        .ref("transactions");

      let newTransactionRef = transactionsDbRef.push();
      newTransactionRef
        .set({
          ...entity,
          id: newTransactionRef.key,
        });

    }

  }

  public cancel() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

}
