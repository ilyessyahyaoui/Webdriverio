Feature: The Internet Guinea Pig Websit

  Scenario Outline: As a user, I can log into the secure area and logout

    Given I am on the login page
    When I login with <username> and <password> and <station>
    Then I am able to view icons
    Then I am able to view elements for admin site moode
    #Then I can connect with my agent
    Then I logout from the admin dashboard
    #Then I am able to launch
    #Then I am able to see the enabled applications

    Examples:
      | username    | password     | station |
      | ilyes_admin | Azertyu0147& | 1       |