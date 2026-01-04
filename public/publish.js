const commercialToggle = document.getElementById("commercial_toggle");
const commercialOptions = document.getElementById("commercial_options");
const yourBrand = document.getElementById("your_brand");
const branded = document.getElementById("branded");
const declaration = document.getElementById("declaration");
const consentText = document.getElementById("consent_text");
const consent = document.getElementById("consent");
const publish = document.getElementById("publish");
const privacy = document.getElementById("privacy");

function updateCommercialUI() {
  if (commercialToggle.checked) {
    commercialOptions.classList.remove("disabled");
  } else {
    commercialOptions.classList.add("disabled");
    yourBrand.checked = false;
    branded.checked = false;
  }

  if (branded.checked) {
    consentText.textContent =
      "By posting, you agree to TikTok's Branded Content Policy and Music Usage Confirmation.";
  } else {
    consentText.textContent =
      "By posting, you agree to TikTok's Music Usage Confirmation.";
  }

  if (commercialToggle.checked && !yourBrand.checked && !branded.checked) {
    publish.disabled = true;
    declaration.textContent = "You must select at least one commercial option.";
  } else {
    declaration.textContent = "";
    publish.disabled = !consent.checked || privacy.value === "";
  }
}

commercialToggle.onchange = updateCommercialUI;
yourBrand.onchange = updateCommercialUI;
branded.onchange = updateCommercialUI;
consent.onchange = updateCommercialUI;
privacy.onchange = updateCommercialUI;

document.getElementById("publish").onclick = async () => {
  const payload = {
    access_token: localStorage.getItem("access_token"),
    video_url: "https://postik5987.pages.dev/sample.mp4",
    title: document.getElementById("title").value,
    privacy_level: document.getElementById("privacy").value,
    allow_comment: document.getElementById("comment").checked,
    allow_duet: document.getElementById("duet").checked,
    allow_stitch: document.getElementById("stitch").checked
  };

  // 🛡️ ADD THIS BLOCK
  if (!payload.access_token) {
    alert("You are not logged in. Please log in with TikTok again.");
    return;
  }
  // 🛡️ END BLOCK

  const resp = await fetch("/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await resp.json();
  alert("Publish started:\n" + JSON.stringify(data, null, 2));
};

updateCommercialUI();