import { Routes } from '@angular/router';
import {ChatPage} from './pages/chat-page/chat-page';
import {SupportPage} from './pages/support-page/support-page';


export const routes: Routes = [
  { path: '', component: ChatPage },
  { path: 'support', component: SupportPage },
  { path: '**', redirectTo: '' }
];
