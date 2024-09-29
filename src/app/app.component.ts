import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatOption, MatRipple} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatRipple, MatListItem, MatNavList, MatIcon, MatFormField, MatSelect, MatOption, MatDrawer, MatButton, MatDrawerContent, MatDrawerContainer, MatSidenavModule, MatButtonModule, MatToolbar, RouterLinkActive, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'list';
}

