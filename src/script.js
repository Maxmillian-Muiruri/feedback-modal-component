document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".modal-overlay");
  const trigger = document.querySelector(".feedback-trigger");
  const cancelBtn = document.querySelector(".cancel-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const ratingNumbers = document.querySelectorAll(".numbers span");
  const confirmation = document.getElementById("feedback-confirmation");

  let selectedRating = null;

  // Check for existing feedback when page loads
  checkSavedFeedback();

  // Open modal
  trigger.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close modal
  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    selectedRating = null;
    submitBtn.disabled = true;
    document.querySelectorAll(".numbers span.selected").forEach((el) => {
      el.classList.remove("selected");
    });
  }

  // Save feedback to LocalStorage
  function saveFeedback(rating) {
    localStorage.setItem("frontendProFeedback", rating);
    localStorage.setItem("feedbackDate", new Date().toISOString());

    // Also store in feedback history
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

  // Check for saved feedback
  function checkSavedFeedback() {
    const savedRating = localStorage.getItem("frontendProFeedback");
    if (savedRating) {
      const savedDate = new Date(localStorage.getItem("feedbackDate"));
      const formattedDate = savedDate.toLocaleDateString();
      showConfirmation(
        `Your previous rating: ${savedRating}/10 (${formattedDate})`
      );

      // Highlight the saved rating
      ratingNumbers.forEach((number) => {
        if (number.textContent === savedRating) {
          number.classList.add("selected");
        }
      });
    }
  }

  // Show confirmation message
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

  // Close handlers
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Rating selection
  ratingNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      ratingNumbers.forEach((num) => num.classList.remove("selected"));
      number.classList.add("selected");
      selectedRating = number.textContent;
      submitBtn.disabled = false;
    });
  });

  // Submit feedback
  submitBtn.addEventListener("click", () => {
    if (selectedRating) {
      saveFeedback(selectedRating);
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
});
