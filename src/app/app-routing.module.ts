import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'historia',
    loadChildren: () => import('./historia/historia.module').then( m => m.HistoriaPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'albergues',
    loadChildren: () => import('./AlberguesContent/albergues/albergues.module').then( m => m.AlberguesPageModule)
  },

  {
    path: 'my-modal',
    loadChildren: () => import('./AlberguesContent/my-modal-albergue/my-modal.module').then( m => m.MyModalPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./AlberguesContent/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'medidas',
    loadChildren: () => import('./MedidasContent/medidas/medidas.module').then( m => m.MedidasPageModule)
  },
  {
    path: 'modal-medidas',
    loadChildren: () => import('./MedidasContent/modal-medidas/modal-medidas.module').then( m => m.ModalMedidasPageModule)
  },
  {
    path: 'miembros',
    loadChildren: () => import('./miembros/miembros.module').then( m => m.MiembrosPageModule)
  },
  {
    path: 'voluntario',
    loadChildren: () => import('./voluntario/voluntario.module').then( m => m.VoluntarioPageModule)
  },
  {
    path: 'integrantes',
    loadChildren: () => import('./integrantes/integrantes.module').then( m => m.IntegrantesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'bienvenido',
    loadChildren: () => import('./bienvenido/bienvenido.module').then( m => m.BienvenidoPageModule)
  },
  {
    path: 'reportar-situacion',
    loadChildren: () => import('./reportar-situacion/reportar-situacion.module').then( m => m.ReportarSituacionPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'mis-situaciones',
    loadChildren: () => import('./mis-situaciones/mis-situaciones.module').then( m => m.MisSituacionesPageModule)
  },
  {
    path: 'mapa-situaciones',
    loadChildren: () => import('./mapa-situaciones/mapa-situaciones.module').then( m => m.MapaSituacionesPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
