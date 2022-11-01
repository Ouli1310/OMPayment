import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'prenom', 'nom', 'email', 'profil', 'entite', 'msisdn', 'status', 'actions'];
  isChecked!: boolean;


  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.allUsers()
    
  }

  allUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(data)

        console.log(this.users)
      }
    )
  }

  updateUser(id: number) {
this.router.navigate(['user/updateUser/'+id])
  }

}
