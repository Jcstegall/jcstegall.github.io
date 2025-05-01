document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.toggle-checkbox');
    
    toggles.forEach((toggle) => {
        toggle.addEventListener('change', function() {
            const wrapper = this.closest('.comparison-wrapper');
            const beforeImg = wrapper.querySelector('.before-image');
            const afterImg = wrapper.querySelector('.after-image');
            
            if (this.checked) {
                beforeImg.style.display = 'none';
                afterImg.style.display = 'block';
            } else {
                beforeImg.style.display = 'block';
                afterImg.style.display = 'none';
            }
        });
    });
});