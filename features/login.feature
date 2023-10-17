Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password> and <station>
    Then I am able to view icons
    Then I am able to view elements for admin site moode
    Then I can connect with my agentt
    #Then I logout from the admin dashboard
    #Then I am able to launch
    #Then I am able to see the enabled applications

    Examples:
      | username    | password     | station |
      | ilyes_admin | Azertyu0147& | 1       |


# Scenario: As a user, I can log into the secure area - invalid credentials
#   Given I am on the login page
#   When I login with <username> and <password> and <station>
#   Then I should see a flash message saying <message>
#   Examples:
#     | username | password | message                                                                                                                             |
#     | foobar   | barfoo   | Mercii de vérifier votre identifiant et mot de passe, Si vous ne pouvez toujours pas vous connecter, contactez votre administrateur |

