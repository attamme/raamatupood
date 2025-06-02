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
            if (kullerFields) {
                kullerFields.style.display = this.value === 'kuller' ? 'block' : 'none';
                const kullerSelect = kullerFields.querySelector('select[name="kuller_provider"]');
                if (kullerSelect) kullerSelect.required = this.value === 'kuller';
            }
            // If you want, do the same for pakiautomaat-select required attribute
            if (pakiautomaatFields) {
                const pakiautomaatSelect = pakiautomaatFields.querySelector('select[name="pakiautomaat"]');
                if (pakiautomaatSelect) pakiautomaatSelect.required = this.value === 'pakiautomaat';
            }
        });
    }

    // --- API fetch for pakiautomaadid (Omniva example) ---
    // Only run if the pakiautomaat select exists
    const pakiautomaatProvider = document.getElementById('pakiautomaat-provider');
    const pakiautomaatSelect = document.getElementById('pakiautomaat-select');
    const pakiautomaatSearch = document.getElementById('pakiautomaat-search');
    let pakiautomaatOptions = [];
    let allProvidersData = {
        omniva: [],
        smartpost: [],
        dpd: []
    };

    // Fetch all providers at once
    function fetchProviders() {
        fetch('https://www.omniva.ee/locations.json')
            .then(res => res.json())
            .then(data => {
                allProvidersData.omniva = data.filter(loc => loc.A0_NAME === 'EE');
                renderPakiaautomaatOptions();
            });
    }

    function renderPakiaautomaatOptions() {
        let options = allProvidersData.omniva.map(loc => ({
            value: loc.NAME,
            text: `${loc.NAME}, ${loc.A1_NAME}, ${loc.A2_NAME || ''}`.trim()
        }));
        pakiautomaatOptions = options;
        filterAndRenderOptions();
    }

    function filterAndRenderOptions() {
        const search = (pakiautomaatSearch.value || '').toLowerCase();
        const currentValue = pakiautomaatSelect.value;
        pakiautomaatSelect.options.length = 1; // Keep placeholder
        let found = false;
        pakiautomaatOptions.forEach(opt => {
            if (opt.text.toLowerCase().includes(search)) {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                if (opt.value === currentValue) {
                    option.selected = true;
                    found = true;
                }
                pakiautomaatSelect.appendChild(option);
            }
        });
        // If the previously selected value is not in the filtered list, select nothing
        if (!found) pakiautomaatSelect.selectedIndex = 0;
    }

    if (pakiautomaatSelect && pakiautomaatProvider) {
        fetchProviders();
        pakiautomaatProvider.addEventListener('change', renderPakiaautomaatOptions);
        if (pakiautomaatSearch) pakiautomaatSearch.addEventListener('input', filterAndRenderOptions);
    }
});