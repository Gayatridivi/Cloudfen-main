import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserAccountComponentsPage, UserAccountDeleteDialog, UserAccountUpdatePage } from './user-account.page-object';

const expect = chai.expect;

describe('UserAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userAccountComponentsPage: UserAccountComponentsPage;
  let userAccountUpdatePage: UserAccountUpdatePage;
  let userAccountDeleteDialog: UserAccountDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserAccounts', async () => {
    await navBarPage.goToEntity('user-account');
    userAccountComponentsPage = new UserAccountComponentsPage();
    await browser.wait(ec.visibilityOf(userAccountComponentsPage.title), 5000);
    expect(await userAccountComponentsPage.getTitle()).to.eq('User Accounts');
    await browser.wait(
      ec.or(ec.visibilityOf(userAccountComponentsPage.entities), ec.visibilityOf(userAccountComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserAccount page', async () => {
    await userAccountComponentsPage.clickOnCreateButton();
    userAccountUpdatePage = new UserAccountUpdatePage();
    expect(await userAccountUpdatePage.getPageTitle()).to.eq('Create or edit a User Account');
    await userAccountUpdatePage.cancel();
  });

  it('should create and save UserAccounts', async () => {
    const nbButtonsBeforeCreate = await userAccountComponentsPage.countDeleteButtons();

    await userAccountComponentsPage.clickOnCreateButton();

    await promise.all([
      userAccountUpdatePage.setUserIdInput('5'),
      userAccountUpdatePage.setFirstNameInput('firstName'),
      userAccountUpdatePage.setLastNameInput('lastName'),
      userAccountUpdatePage.setPhoneInput('phone'),
      userAccountUpdatePage.setPassportInput('passport'),
      userAccountUpdatePage.setEmailInput('email'),
    ]);

    await userAccountUpdatePage.save();
    expect(await userAccountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserAccount', async () => {
    const nbButtonsBeforeDelete = await userAccountComponentsPage.countDeleteButtons();
    await userAccountComponentsPage.clickOnLastDeleteButton();

    userAccountDeleteDialog = new UserAccountDeleteDialog();
    expect(await userAccountDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this User Account?');
    await userAccountDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(userAccountComponentsPage.title), 5000);

    expect(await userAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
