## Task Descriptions

### Task 1: Countdown Timer

- **Objective**: Implement a countdown timer that allows users to pick a future date and time, and counts down to that moment.
  
- **Components**:
  - **Date Picker**: Utilizes the `flatpickr` library to allow users to select a date and time. The selected date must be in the future.
  - **Start Button**: This button is enabled only when a valid future date is selected.
  - **Timer Display**: Shows the remaining time in days, hours, minutes, and seconds. Updates every second.
  - **Error Handling**: If a past date is selected, an error message is displayed using `iziToast`.

- **Functionality**:
  - When the timer reaches zero, it stops and resets the display.
  - User can reset inputs and start a new countdown after completion.

### Task 2: Promise Generator with Notifications

- **Objective**: Create a form that generates a promise and notifies the user of its outcome using `iziToast`.

- **Components**:
  - **Form**: Includes an input for delay in milliseconds and radio buttons to select the promise state (`fulfilled` or `rejected`).
  - **Submit Button**: Triggers the promise creation and displays a notification based on the promise result.

- **Functionality**:
  - On form submission, a promise with the specified delay and state is created.
  - If the promise is fulfilled, a success notification is displayed.
  - If the promise is rejected, an error notification is shown.
  - After submission, the form is reset for new inputs.

