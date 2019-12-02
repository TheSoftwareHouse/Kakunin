Feature: Confirm recaptcha
    As a kakunin user
    I want to confirm recaptcha

    Scenario: Submit without confirming recaptcha
        Given I visit the "main" page
        When I click the "recaptchaLink" element
        Then the "recaptcha" page is displayed
        When I fill the "form" form with:
            | emailElement | test@example.com |
        And I click the "postCommentButton" element
        Then there is element "recaptchaNotConfirmed" containing "Please select captcha" text

    Scenario: Confirm recaptcha
        Given I visit the "main" page
        When I click the "recaptchaLink" element
        Then the "recaptcha" page is displayed
        When I fill the "form" form with:
            | emailElement | test@example.com |
        And I confirm the recaptcha in "iframeElement" iframe
        And I click the "postCommentButton" element
        Then the "main" page is displayed
