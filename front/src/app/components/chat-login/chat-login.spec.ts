import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLogin } from './chat-login';

describe('ChatLogin', () => {
  let component: ChatLogin;
  let fixture: ComponentFixture<ChatLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
