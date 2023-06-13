## Event Management System Challenge
### Release 1: Basic Event Listing and Creation
1. Design the user interface:
   - Create a component called `EventList` that renders a list of events.
   - Each event should be clickable, and when clicked, it should navigate to the `EventDetails` component.
2. Implement event listing and event details functionality:
   - In the `EventList` component, map through a mock array of events and display their titles and dates.
   - Use React Router to handle navigation to the `EventDetails` component when an event is clicked.
   - In the `EventDetails` component, display the full event details, including the title, date, time, location, and description.
   - Add a back button to navigate back to the `EventList` component.
3. Add event creation functionality:
   - Create a form component called `EventForm` with fields for the title, date, time, location, and description.
   - Handle form submission by capturing the form values and adding a new event to the event list.
### Release 2: Editing, Deleting, and Categorizing Events
1. Implement editing and deleting events:
   - Add an "Edit" button in the `EventDetails` component that navigates to an `EditEvent` component.
   - Prepopulate the form in the `EditEvent` component with the event details.
   - Handle form submission to update the event details in the event list.
   - Provide a confirmation prompt before deleting an event and remove the event from the list when confirmed.
2. Add event categories:
   - Extend the `EventForm` component with a dropdown field for selecting event categories.
   - Categorize events based on their respective categories in the event list component.
   - Allow users to filter events by category using a dropdown or tabs.
3. Implement event search:
   - Add a search bar component that captures user input.
   - Filter the event list based on the search query and display the matching events.
### Release 3: Advanced Features
1. Implement pagination or infinite scrolling:
   - Divide the event list into pages or dynamically load more events as the user scrolls.
   - Display a limited number of events per page or batch.
2. Enable event registration and RSVP:
   - Add a registration form component that captures the user's name and contact information.
   - Integrate the registration form with an API or mock API to store registration data.
   - Display the number of registered attendees for each event in the `EventDetails` component.
3. Implement event notifications and reminders:
   - Integrate a notification system or use browser-based notifications to send reminders to registered attendees.
Guidelines:
- Use React functional components and hooks to build the user interface and manage state.
- Utilize React Router for navigation between different views, such as the event list, event details, and event editing.
- Store the event data in a state management tool like Redux or the React Context API.
- Consider using a UI library like Material-UI, Ant Design, or React Bootstrap for enhanced visual components.
- You can use libraries like Mirage JS (https://miragejs.com/) to create a mock API server. Configure the mock server to handle the defined endpoints and return mock data when requests are made.
- Use Axios or Fetch API to interact with a mock API or server for data fetching and manipulation.
- Provide clear instructions on how to run the application and any necessary setup steps in the documentation.