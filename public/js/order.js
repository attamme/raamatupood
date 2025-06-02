document.addEventListener('DOMContentLoaded', () => {
    const makseviis = document.querySelector('select[name="makseviis"]');
    const cardFields = document.getElementById('card-fields');
    const bankFields = document.getElementById('bank-fields');
    const saatmisviis = document.querySelector('select[name="saatmisviis"]');
    const pakiautomaatFields = document.getElementById('pakiautomaat-fields');
    const kullerFields = document.getElementById('kuller-fields');

    // Payment method logic
    if (makseviis) {
        makseviis.addEventListener('change', function() {
            // Pangakaart
            if (cardFields) {
                if (this.value === 'pangakaart') {
                    cardFields.style.display = 'block';
                    cardFields.querySelectorAll('input').forEach(input => input.required = true);
                } else {
                    cardFields.style.display = 'none';
                    cardFields.querySelectorAll('input').forEach(input => input.required = false);
                }
            }
            // Pangalink
            if (bankFields) {
                if (this.value === 'pangalink') {
                    bankFields.style.display = 'block';
                    bankFields.querySelectorAll('input').forEach(input => input.required = true);
                } else {
                    bankFields.style.display = 'none';
                    bankFields.querySelectorAll('input').forEach(input => input.required = false);
                }
            }
        });
    }

    // Shipping method logic
    if (saatmisviis) {
        saatmisviis.addEventListener('change', function() {
            if (pakiautomaatFields) pakiautomaatFields.style.display = this.value === 'pakiautomaat' ? 'block' : 'none';
            if (kullerFields) kullerFields.style.display = this.value === 'kuller' ? 'block' : 'none';
        });
    }

    // --- API fetch for pakiautomaadid (Omniva example) ---
    // Only run if the pakiautomaat select exists
    const pakiautomaatSelect = document.getElementById('pakiautomaat-select');
    const pakiautomaatSearch = document.getElementById('pakiautomaat-search');
    let pakiautomaatOptions = [];

    if (pakiautomaatSelect) {
        fetch('https://www.omniva.ee/locations.json')
            .then(res => res.json())
            .then(data => {
                pakiautomaatOptions = data.filter(location => location.A0_NAME === 'EE');
                pakiautomaatOptions.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location.NAME;
                    option.textContent = `${location.NAME}, ${location.A1_NAME}, ${location.A2_NAME}`;
                    pakiautomaatSelect.appendChild(option);
                });
            });

        if (pakiautomaatSearch) {
            pakiautomaatSearch.addEventListener('input', function() {
                const search = this.value.toLowerCase();
                // Remove all except the first (placeholder) option
                pakiautomaatSelect.options.length = 1;
                pakiautomaatOptions.forEach(location => {
                    const text = `${location.NAME}, ${location.A1_NAME}, ${location.A2_NAME}`.toLowerCase();
                    if (text.includes(search)) {
                        const option = document.createElement('option');
                        option.value = location.NAME;
                        option.textContent = `${location.NAME}, ${location.A1_NAME}, ${location.A2_NAME}`;
                        pakiautomaatSelect.appendChild(option);
                    }
                });
            });
        }
    }
});