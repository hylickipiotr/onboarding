## Onboarding React Technical Assesment:

As part of new client onboarding project we will need to implement a bunch of screens that are in React and mobile optimised, one of the more complicated ones is the screen that captures login details.

In this assesment the goal is to implement the UI of the designs only for mobile, don't worry about supporting normal desktop browsers as well. 

### Requirements:
- Password field has characters entered obfuscated
- Password validation implemented and will update the relevant criteria with green ticks when satisfied
- Secure number textfields only allow numbers to be entered
- The security question section should show the following options:
```
    [
        "What's your mother's maiden name?", 
        "In what city were you born?", 
        "What was the your first pet called?", 
        "What was your first car?", 
        "What was the first concert you attended?"
    ]
```
- If security question is selected it shouldn't be an option in the other drop down input fields

- If "Continue" button tapped and not all input fields have been filled in please show generic error text at top of page saying "All input fields are mandatory".

- If "Continue" button tapped and all fields have input please navigate to new page and print out LoginDetails object in JSON format, don't worry about making this page look nice we're just interested in seeing the correct input is being captured.

LoginDetails object JSON format:
```
{
    "password": String,
    "secure_number": String,
    "security_questions": [{
    	"question": String,
	"answer" : String
    }]
}
```
