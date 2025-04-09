document.addEventListener('DOMContentLoaded', () => {
  
    const form = document.getElementById('bookForm');
    const modal = document.getElementById('authorPublisherModal');
    const authorFields = document.getElementById('authorFields');
    const publisherFields = document.getElementById('publisherFields');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const autor = form.autor_nimi.value;
      const kirjastaja = form.kirjastaja_nimi.value;
  
      const res = await fetch('/admin/check-author-publisher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autor, kirjastaja })
      });
  
      const { autorMissing, kirjastajaMissing } = await res.json();
  
      if (autorMissing || kirjastajaMissing) {
  
        if (autorMissing) {
          authorFields.classList.remove('hidden');
          const autorInput = document.getElementById('autor_nimi');
          if (autorInput) autorInput.value = autor;
        } else {
          authorFields.classList.add('hidden');
        }
  
        if (kirjastajaMissing) {
          publisherFields.classList.remove('hidden');
          const kirjastajaInput = document.getElementById('kirjastaja_nimi');
          if (kirjastajaInput) kirjastajaInput.value = kirjastaja;
        } else {
          publisherFields.classList.add('hidden');
        }
  
        modal.classList.remove('hidden');
  
        document.getElementById('confirmPopup').onclick = () => {
            const formData = new FormData(form);
            const extraFields = [
            'autor_aadress',
            'autor_url',
            'kirjastaja_aadress',
            'kirjastaja_telefon',
            'kirjastaja_url'
          ];
          extraFields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
              formData.append(field, input.value);
            } else {
            }
          });
          

          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          
          fetch('/admin/books', {
            method: 'POST',
            body: formData
          }).then(() => window.location.reload());
        };
      } else {
        form.submit();
      }
    });
  });
  