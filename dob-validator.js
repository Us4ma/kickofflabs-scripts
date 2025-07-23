<input
  type="text"
  id="date_of_birth_or_age_"
  name="date_of_birth_or_age_"
  placeholder="MM/DD/YY"
  maxlength="8"
  class="kol-form-control form-control input-lg"
/>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const dob = document.getElementById("date_of_birth_or_age_");
  if (!dob) return;

  // returns # days in a given month (1–12) of a given full year
  const daysInMonth = (m, fullYear) => new Date(fullYear, m, 0).getDate();

  dob.addEventListener("input", () => {
    let v = dob.value.replace(/\D/g, "").slice(0, 6);         // strip to up to 6 digits MMDDYY
    let mm = v.slice(0, 2);
    let dd = v.slice(2, 4);
    let yy = v.slice(4, 6);

    // clamp month to 01–12
    if (mm.length === 2) {
      let m = parseInt(mm, 10);
      m = Math.min(Math.max(m, 1), 12);
      mm = String(m).padStart(2, "0");
    }

    // now that we’ve got a month and (possibly) a year, figure out max days
    if (dd.length === 2) {
      // interpret YY as 20YY
      const fullYear = 2000 + parseInt(yy || "00", 10);
      const monthNum = parseInt(mm || "1", 10);
      const maxDay = daysInMonth(monthNum, fullYear);

      let d = parseInt(dd, 10);
      d = Math.min(Math.max(d, 1), maxDay);
      dd = String(d).padStart(2, "0");
    }

    // rebuild with slashes
    let out = mm;
    if (dd) out += "/" + dd;
    if (yy) out += "/" + yy;
    dob.value = out;
  });

  // enforce complete MM/DD/YY on blur
  dob.addEventListener("blur", () => {
    if (!/^\d{2}\/\d{2}\/\d{2}$/.test(dob.value)) {
      dob.setCustomValidity("Enter a valid MM/DD/YY date");
    } else {
      dob.setCustomValidity("");
    }
    dob.reportValidity();
  });
});
</script>
