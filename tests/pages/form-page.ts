import { type Page, type Locator, expect } from '@playwright/test';
import validFormData from '../utils/validFormData';
import formLabels from '../utils/formLabels';

/**
 * Represents the practice form page in the application
 */
class FormPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly genderRadio: (gender: string) => Locator; // We will pass an argument later to the locator
    readonly mobileField: Locator;
    readonly dobField: Locator;
    readonly dayCell: (day: string) => Locator;
    readonly subjectsField: Locator;
    readonly hobbyCheckbox: (hobby: string) => Locator;
    readonly currentAddrField: Locator;
    readonly stateField: Locator;
    readonly stateOption: (state: string) => Locator;
    readonly cityField: Locator;
    readonly cityOption: (city: string) => Locator;
    readonly submitButton: Locator;

    readonly formReceiptRow: (label: string) => Locator;

    /**
     * Initializes a new instance of the FormPage class
     * 
     * @param page, The Playwright page object
     */
    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
        this.emailField = page.getByRole('textbox', { name: 'name@example.com' });
        // Function where we will pass a gender argument to the locator later
        this.genderRadio = (gender: string) => page.getByRole('radio', { name: gender, exact: true });
        this.mobileField = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dobField = page.locator('#dateOfBirthInput');
        this.dayCell = (day: string) => page.getByRole('gridcell', { name: day });
        this.subjectsField = page.locator('#subjectsInput');
        this.hobbyCheckbox = (hobby: string) => page.getByRole('checkbox', { name: hobby });
        this.currentAddrField = page.getByRole('textbox', { name: 'Current Address' });
        this.stateField = page.locator('div').filter({ hasText: /^Select State$/ }).nth(3);
        this.stateOption = (state: string) => page.getByRole('option', { name: state });
        this.cityField = page.locator('div').filter({ hasText: /^Select City$/ }).nth(3);
        this.cityOption = (city: string) => page.getByRole('option', { name: city });
        this.submitButton = page.getByRole('button', { name: 'Submit' });

        this.formReceiptRow = (label: string) => page.getByRole('row').filter({ hasText: label });
    }

    /**
     * Completes all of the form fields (except uploading a file) with valid data
     */
    async completeAllFieldsValidData() {
        await this.firstNameField.fill(validFormData.firstName);
        await this.lastNameField.fill(validFormData.lastName);
        await this.emailField.fill(validFormData.email);

        // force: true is used to ensure the radio button is checked even if it's not immediately visible or interactable
        await this.genderRadio(validFormData.gender).check({ force: true });

        await this.mobileField.fill(validFormData.mobile);

        await this.dobField.click();
        await this.dayCell(validFormData.dobDay).click();

        await this.subjectsField.fill(validFormData.subject);
        await this.subjectsField.press('Enter');

        await this.hobbyCheckbox(validFormData.hobby).check();

        await this.currentAddrField.fill(validFormData.currentAddr);
        await this.stateField.click();
        await this.stateOption(validFormData.state).click();
        await this.cityField.click();
        await this.cityOption(validFormData.city).click();
        await this.submitButton.click();
    }

    /**
     * Checks that the form receipt reflects the correct input submitted by the user (assumes all fields except the file upload)
     * were filled
     */
    async checkSuccessfulFormSubmission() {
        await expect(this.formReceiptRow(formLabels.studentName)).toContainText(validFormData.firstName + ' ' + validFormData.lastName);
        await expect(this.formReceiptRow(formLabels.studentEmail)).toContainText(validFormData.email);
        await expect(this.formReceiptRow(formLabels.gender)).toContainText(validFormData.gender);
        await expect(this.formReceiptRow(formLabels.mobile)).toContainText(validFormData.mobile);
        await expect(this.formReceiptRow(formLabels.dob)).toContainText(validFormData.dob);
        await expect(this.formReceiptRow(formLabels.subjects)).toContainText(validFormData.subject);
        await expect(this.formReceiptRow(formLabels.hobbies)).toContainText(validFormData.hobby);
        await expect(this.formReceiptRow(formLabels.address)).toContainText(validFormData.currentAddr);
        await expect(this.formReceiptRow(formLabels.stateAndCity)).toContainText(validFormData.state + ' ' + validFormData.city);
    }
}

export default FormPage;