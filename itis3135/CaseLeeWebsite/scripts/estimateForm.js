
// Use the global jsPDF object from CDN

function validateForm() {
    const requiredFields = document.querySelectorAll('#estimateForm [required]');
    let isValid = true;

    requiredFields.forEach((field) => {
        if (!field.value) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

function handleImagePreview(event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = '';

    Array.from(event.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.className = 'preview-item';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Damage preview">
                <button type="button" class="remove-image">&times;</button>
            `;
            imagePreview.appendChild(preview);
        };
        reader.readAsDataURL(file);
    });
}

function collectFormData() {
    return {
        personal: {
            name: document.querySelector('#estimateForm #name').value,
            phone: document.querySelector('#estimateForm #phone').value,
            email: document.querySelector('#estimateForm #email').value
        },
        vehicle: {
            year: document.querySelector('#estimateForm #carYear').value,
            make: document.querySelector('#estimateForm #carMake').value,
            model: document.querySelector('#estimateForm #carModel').value,
            vin: document.querySelector('#estimateForm #vin').value
        },
        damage: {
            type: document.querySelector('#estimateForm #damageType').value,
            size: document.querySelector('#estimateForm #damageSize').value,
            description: document.querySelector('#estimateForm #damageDescription').value
        },
        preferences: {
            contactMethod: document.querySelector('#estimateForm #preferredContact').value
        }
    };
}
function generatePDF(formData) {
    // Create new jsPDF instance using the correct namespace
    const doc = new window.jspdf.jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.text('Case Lee PDR - Estimate Request', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 30);

    doc.setFontSize(16);
    doc.text('Customer Information', 20, 45);
    doc.setFontSize(12);
    doc.text(`Name: ${formData.personal.name}`, 20, 55);
    doc.text(`Phone: ${formData.personal.phone}`, 20, 65);
    doc.text(`Email: ${formData.personal.email}`, 20, 75);

    doc.setFontSize(16);
    doc.text('Vehicle Information', 20, 95);
    doc.setFontSize(12);
    doc.text(`Year: ${formData.vehicle.year}`, 20, 105);
    doc.text(`Make: ${formData.vehicle.make}`, 20, 115);
    doc.text(`Model: ${formData.vehicle.model}`, 20, 125);
    doc.text(`VIN: ${formData.vehicle.vin}`, 20, 135);

    doc.setFontSize(16);
    doc.text('Damage Details', 20, 155);
    doc.setFontSize(12);
    doc.text(`Type: ${formData.damage.type}`, 20, 165);
    doc.text(`Size: ${formData.damage.size}`, 20, 175);
    doc.text('Description:', 20, 185);
    const splitDescription = doc.splitTextToSize(formData.damage.description, 170);
    doc.text(splitDescription, 20, 195);

    doc.setFontSize(10);
    doc.text('This is an initial estimate request and final pricing may vary upon inspection.', 105, 280, { align: 'center' });

    // Add timestamp to filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    doc.save(`CaseLee_PDR_Estimate_${timestamp}.pdf`);
}

function resetForm() {
    document.getElementById('estimateForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const formData = collectFormData();
    generatePDF(formData);
}

function initializeForm() {
    const form = document.getElementById('estimateForm');
    const imageUpload = document.getElementById('damageImages');
    const imagePreview = document.getElementById('imagePreview');

    // Handle image preview
    imageUpload.addEventListener('change', handleImagePreview);

    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});
