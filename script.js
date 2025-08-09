const sections = document.querySelectorAll(".form-section");
const steps = document.querySelectorAll(".step");
let currentSection = 0;


function updateSteps() {
  steps.forEach((step, index) => {
    step.classList.remove("active", "completed");
    if (index < currentSection) {
      step.classList.add("completed");
    } else if (index === currentSection) {
      step.classList.add("active");
    }
  });
}

// Next button click
document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    sections[currentSection].classList.remove("active");
    currentSection++;
    sections[currentSection].classList.add("active");
    updateSteps();
  });
});

// Previous button click
document.querySelectorAll(".prev-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    sections[currentSection].classList.remove("active");
    currentSection--;
    sections[currentSection].classList.add("active");
    updateSteps();
  });
});

// Submit form
document.getElementById("multiForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  let res = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  let result = await res.json();
  document.getElementById("responseMsg").textContent = result.message;

  // Reset form
  e.target.reset();
  sections.forEach(s => s.classList.remove("active"));
  currentSection = 0;
  sections[currentSection].classList.add("active");
  updateSteps();
});
