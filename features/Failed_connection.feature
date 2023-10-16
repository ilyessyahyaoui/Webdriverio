Feature: The Internet Guinea Pig Website
    Scenario: As a user, I can log into the secure area - invalid credentials
        Given I am on the login page
        When I login with <username> and <password> and <station>
        Then I should see a flash message saying <message>
        Examples:
            | username | password | message                                                                                                                             |
            | foobar   | barfoo   | Mercii de vérifier votre identifiant et mot de passe, Si vous ne pouvez toujours pas vous connecter, contactez votre administrateur |