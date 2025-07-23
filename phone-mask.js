<script>
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.querySelector("input[name='phone_number']");
  if (!phoneInput) return;

  phoneInput.addEventListener("input", function () {
    // strip non-digits, limit to 10 digits
    let digits = phoneInput.value.replace(/\D/g, "").substring(0, 10);

    if (digits.length > 6) {
      phoneInput.value = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      phoneInput.value = `${digits.slice(0,3)}-${digits.slice(3)}`;
    } else {
      phoneInput.value = digits;
    }
  });

  phoneInput.addEventListener("blur", function () {
    // only accept exactly 10 digits in the XXX-XXX-XXXX pattern
    const ok = /^\d{3}-\d{3}-\d{4}$/.test(phoneInput.value);
    if (!ok) {
      phoneInput.setCustomValidity("Please enter a 10-digit U.S. number like 310-555-1234");
    } else {
      phoneInput.setCustomValidity("");
    }
  });
});
</script>
