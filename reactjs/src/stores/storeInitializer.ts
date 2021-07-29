import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import ObjectStore from './objectStore';
import ReviewStore from './reviewStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    objectStore: new ObjectStore(),
    reviewStore: new ReviewStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
  };
}
