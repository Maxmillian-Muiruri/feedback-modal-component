## Live Demo
➡[View on Vercel](https://feedback-modal-component-git-main-maxmillianmuiruris-projects.verce)

# Feedback Modal Component

![Screenshot](/src/Screenshot.png)

## Project Overview

A responsive feedback modal component that allows users to rate their experience on a scale of 1-10. The modal can be triggered by a button and saves ratings to localStorage.

## Features

- Interactive rating scale (1-10)
- Modal overlay with smooth animations
- Previous rating recall from localStorage
- Responsive design
- Keyboard navigation (ESC to close)

## Installation & Usage

1. Clone the repository
2. Open `index.html` in a browser
3. Click the "Give Feedback" button to open the modal
4. Select a rating and submit

## File Structure

```
/feedback
├── index.html        # Main HTML file
├── README.md         # Project documentation
├── design/           # Design assets
└── src/
    ├── style.css     # Styling for the modal
    └── script.js     # Modal functionality
```

## Technical Details

- **HTML5** for structure
- **CSS3** for styling and animations
- **JavaScript** for interactive functionality
- **LocalStorage** for persisting ratings

## Requirements

- The modal should:
  - Open on button click
  - Close on cancel/outside click/ESC key
  - Save ratings to localStorage
  - Be responsive across devices
