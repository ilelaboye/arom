function toggleNav() {
  const menu = document.getElementById("sidebar");
  menu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Handling
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const data = new FormData(event.target);
      const firstName = data.get("first_name").trim();
      const lastName = data.get("last_name").trim();
      const email = data.get("email").trim();
      const phone = data.get("phone").trim();
      const company = data.get("company").trim();
      const message = data.get("message").trim();

      // Simple validation
      if (!firstName || !lastName || !email || !phone || !company || !message) {
        status.innerHTML =
          '<div class="alert alert-danger">Please fill in all fields.</div>';
        return;
      }

      status.innerHTML = '<div class="alert alert-info">Sending...</div>';

      try {
        const response = await fetch("https://formspree.io/f/mnjbkwoa", {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          status.innerHTML =
            '<div class="alert alert-success">Message sent successfully!</div>';
          form.reset();
        } else {
          const result = await response.json();
          if (Object.hasOwn(result, "errors")) {
            const errorMessages = result.errors
              .map((error) => error.message)
              .join(", ");
            status.innerHTML = `<div class="alert alert-danger">Oops! ${errorMessages}</div>`;
          } else {
            status.innerHTML =
              '<div class="alert alert-danger">Oops! There was a problem submitting your form.</div>';
          }
        }
      } catch (error) {
        status.innerHTML =
          '<div class="alert alert-danger">Oops! There was a problem submitting your form.</div>';
      }
    });
  }
});
