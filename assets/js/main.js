document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const clearBtn = document.getElementById("clearBtn");
  const readMoreBtn = document.getElementById("readMoreBtn");
  const modal = document.getElementById("termsModal");
  const closeModal = document.getElementById("closeModal");
  const termsPreview = document.getElementById("termsPreview");
  const fullTerms = document.getElementById("fullTerms");

  const termsAndConditions =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  termsPreview.textContent = termsAndConditions.slice(0, 100) + "...";
  fullTerms.textContent = termsAndConditions;

  function validateField(field) {
    const value = field.value.trim();
    let error = "";

    switch (field.id) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          error = "Only characters are allowed";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "contactNumber":
        if (!/^\d+$/.test(value)) {
          error = "Only numbers are allowed";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        } else if (!/[!@#$&*]/.test(value)) {
          error =
            "Password must contain at least one special character (!@#$&*)";
        } else if (
          value
            .toLowerCase()
            .includes(
              document.getElementById("firstName").value.toLowerCase()
            ) ||
          value
            .toLowerCase()
            .includes(document.getElementById("lastName").value.toLowerCase())
        ) {
          error = "Password should not include first name or last name";
        }

        break;
      case "confirmPassword":
        if (value !== document.getElementById("password").value) {
          error = "Passwords do not match";
        }
        break;
    }

    field.nextElementSibling.textContent = error;
    return error === "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll("input").forEach(function (input) {
      if (input.type !== "checkbox" && !validateField(input)) {
        isValid = false;
      }
    });

    if (!document.getElementById("acceptTerms").checked) {
      isValid = false;
      alert("Please accept the Terms and Conditions");
    }

    if (isValid) {
      console.log("Form submitted successfully");
      window.location.href = '../../pages/exam.html';
    }
  });

  form.querySelectorAll("input").forEach(function (input) {
    if (input.type !== "checkbox") {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    }
  });

  clearBtn.addEventListener("click", function () {
    form.reset();
    form.querySelectorAll(".error").forEach(function (error) {
      error.textContent = "";
    });
  });

  readMoreBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
