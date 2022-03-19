/**
 * Return the checkbox that toggles whether badge requests are sent.
 */
function badgeCheckbox() {
  return /** @type {HTMLInputElement} */ (document.getElementById('netvyneBadge'));
}

function saveOptions() {
  chrome.storage.sync.set({
    netvyneBadge: badgeCheckbox().checked,
  });
  // chrome.storage.local.set({ netvyneBadge: badgeCheckbox().checked });
  // localStorage.setItem('netvyneBadge', badgeCheckbox().checked);
}

function loadOptions() {
  chrome.storage.sync.get(
    {
      netvyneBadge: true,
    }, (items) => {
      badgeCheckbox().checked = items.netvyneBadge;
    }
  );
}

document.addEventListener('DOMContentLoaded', loadOptions);
badgeCheckbox().addEventListener('click', saveOptions);
