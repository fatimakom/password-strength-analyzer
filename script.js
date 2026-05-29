const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const toggleBtn = document.getElementById("toggleBtn");
const copyBtn = document.getElementById("copyBtn");

const checks = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  symbol: document.getElementById("symbol"),
};

const generateBtn = document.getElementById("generateBtn");

passwordInput.addEventListener("input", analyzePassword);

toggleBtn.addEventListener("click", () => {

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.innerText = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.innerText = "Show";
  }

});
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

function analyzePassword() {

  const password = passwordInput.value;

  let score = 0;

  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  updateRequirement(checks.length, hasLength);
  updateRequirement(checks.uppercase, hasUppercase);
  updateRequirement(checks.lowercase, hasLowercase);
  updateRequirement(checks.number, hasNumber);
  updateRequirement(checks.symbol, hasSymbol);

  if (hasLength) score++;
  if (hasUppercase) score++;
  if (hasLowercase) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  updateStrength(score);

}

function updateRequirement(element, valid) {

  if (valid) {
    element.innerHTML = element.innerHTML.replace("❌", "✅");
  } else {
    element.innerHTML = element.innerHTML.replace("✅", "❌");
  }

}

function updateStrength(score) {

  let width = "0%";
  let color = "red";
  let text = "Weak";

  switch(score) {

    case 1:
      width = "20%";
      color = "red";
      text = "Very Weak";
      break;

    case 2:
      width = "40%";
      color = "orange";
      text = "Weak";
      break;

    case 3:
      width = "60%";
      color = "yellow";
      text = "Medium";
      break;

    case 4:
      width = "80%";
      color = "#22c55e";
      text = "Strong";
      break;

    case 5:
      width = "100%";
      color = "#16a34a";
      text = "Very Strong";
      break;
  }

  strengthBar.style.width = width;
  strengthBar.style.background = color;

  strengthText.innerText = `Strength: ${text}`;

}
function generatePassword() {

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~|}{[]:;?><,./-=";

  const allChars =
    uppercase +
    lowercase +
    numbers +
    symbols;

  let password = "";

  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < 14; i++) {

    password += allChars[
      Math.floor(Math.random() * allChars.length)
    ];

  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordInput.value = password;

  analyzePassword();

}
function copyPassword() {

  const password = passwordInput.value;

  if (!password) {

    alert("Generate or enter a password first.");
    return;

  }

  navigator.clipboard.writeText(password);

  copyBtn.innerText = "Copied!";

  setTimeout(() => {

    copyBtn.innerText = "Copy Password";

  }, 2000);

}