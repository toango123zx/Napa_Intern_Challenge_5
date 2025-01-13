#Challenge: Create a Sign In and Sign Up System
- Participants must ensure the layout is built accurately with respect to spacing, size, colors, fonts, and effects, matching the design in Figma

##Application Pages (The order in which the pages will be done)
- Sign up
- Sign in

###Technologies Used
- HTML
- SCSS (Variables, Mixins, Nesting, @extend)
- BEM structured naming method
- JavaScript (ES6): For API integration and handling user interactions
- Fetch API: For making HTTP requests to the server

####Challenge Requirement
- Create a responsive page for signing in and signing up.
- The design should match the provided reference link.
- Implement form validation (e.g., empty fields, invalid email format).
- On form submission, use JavaScript to make a POST request to a mock API endpoint.
- Display appropriate error or success messages based on the API response.

#####Link Design Prefer
- https://dashcraft.framer.website/Sign-up
- https://dashcraft.framer.website/Sign-in

######Link API
- https://crudnodejs-production.up.railway.app/api-docs/

#######Structute Project
project/
├── index.html          # Sign In page
├── signup.html         # Sign Up page
├── scss/
│   ├── main.scss       # Main SCSS file
│   ├── _variables.scss # Variables for colors, fonts, etc.
│   ├── _mixins.scss    # SCSS mixins for reuse
│   └── _forms.scss     # Styles for form elements
├── css/
│   └── main.css        # Compiled CSS from SCSS
├── js/
│   ├── signin.js       # Logic for Sign In
│   ├── signup.js       # Logic for Sign Up
│   └── api.js          # Common API integration logic
├── assets/
│   └── images/         # Logos or other assets
└── README.md           # Instructions for running the project