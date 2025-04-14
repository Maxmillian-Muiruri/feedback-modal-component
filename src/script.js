/**
 * @file script.js
 * @description Handles the feedback modal functionality, including opening, closing, and saving feedback.
 */

document.addEventListener("DOMContentLoaded", function () {
  // Opens the modal overlay and disables body scroll.
  const closeBtn = document.querySelector(".close-btn");
  const overlay = document.querySelector(".modal-overlay");
  const trigger = document.querySelector(".feedback-trigger");
  const cancelBtn = document.querySelector(".cancel-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const ratingNumbers = document.querySelectorAll(".numbers span");
  const confirmation = document.getElementById("feedback-confirmation");

  let selectedRating = null;

  checkSavedFeedback();

  closeBtn.addEventListener("click", closeModal);

  /**
   * @function openModal
   * @description Opens the modal overlay and disables body scroll.
   */
  trigger.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  /**
   * @function closeModal
   * @description Closes the modal and resets the selected rating.
   */
  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    selectedRating = null;
    submitBtn.disabled = true;
    document.querySelectorAll(".numbers span.selected").forEach((el) => {
      el.classList.remove("selected");
    });
  }

  /**
   * @function saveFeedback
   * @description Saves the feedback rating to local storage and updates the feedback history.
   */
  function saveFeedback(rating) {
    localStorage.setItem("frontendProFeedback", rating);
    localStorage.setItem("feedbackDate", new Date().toISOString());

    /**
     * @constant {Array} feedbackHistory - Array of feedback history objects.
     * @property {number} rating - The rating given by the user.
     */
    const feedbackHistory = JSON.parse(
      localStorage.getItem("feedbackHistory") || "[]"
    );
    feedbackHistory.push({
      rating: rating,
      date: new Date().toISOString(),
    });
    localStorage.setItem("feedbackHistory", JSON.stringify(feedbackHistory));

    showConfirmation(`Thank you! Your ${rating}/10 rating has been saved.`);
  }

  /**
   * * @function checkSavedFeedback
   * @description Checks if there is saved feedback in local storage and displays it.
   */
  function checkSavedFeedback() {
    const savedRating = localStorage.getItem("frontendProFeedback");
    if (savedRating) {
      const savedDate = new Date(localStorage.getItem("feedbackDate"));
      const formattedDate = savedDate.toLocaleDateString();
      showConfirmation(
        `Your previous rating: ${savedRating}/10 (${formattedDate})`
      );

      /**
       * * @constant {NodeList} ratingNumbers - NodeList of rating number elements.
       * @description Selects all span elements within the numbers class.
       */
      ratingNumbers.forEach((number) => {
        if (number.textContent === savedRating) {
          number.classList.add("selected");
        }
      });
    }
  }

  /**
   *
   * @function showConfirmation
   * @description Displays a confirmation message for a specified duration.
   */
  function showConfirmation(message) {
    confirmation.textContent = message;
    confirmation.style.display = "block";
    setTimeout(() => {
      confirmation.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      confirmation.style.opacity = "0";
      setTimeout(() => {
        confirmation.style.display = "none";
      }, 300);
    }, 3000);
  }

  /**
   * @function handleKeyPress
   * @description Handles key press events for the modal overlay.
   */
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  /**
   * * @function handleRatingSelection
   * @description Handles the selection of rating numbers and enables the submit button.
   */
  ratingNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      ratingNumbers.forEach((num) => num.classList.remove("selected"));
      number.classList.add("selected");
      selectedRating = number.textContent;
      submitBtn.disabled = false;
    });
  });

  /**
   * * @function handleSubmit
   * @description Handles the submission of feedback and closes the modal.
   */
  submitBtn.addEventListener("click", () => {
    if (selectedRating) {
      saveFeedback(selectedRating);
      closeModal();
    }
  });
  /**
   * @function handleEscapeKey
   * @description Handles the Escape key press to close the modal overlay.
   */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
});
