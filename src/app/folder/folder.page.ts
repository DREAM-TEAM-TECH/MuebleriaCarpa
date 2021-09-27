import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private menu: MenuController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.menu.enable(true)
  }

}
