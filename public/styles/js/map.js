
document.addEventListener('DOMContentLoaded', () => {
    const provinces = document.querySelectorAll('.province');
    const visitedProvincesList = document.getElementById('visited-provinces');
    const visitedProvinces = new Set();

    provinces.forEach(province => {
        province.addEventListener('click', () => {
            const provinceName = province.getAttribute('data-name');
            if (visitedProvinces.has(provinceName)) {
                visitedProvinces.delete(provinceName);
                province.classList.remove('visited');
            } else {
                visitedProvinces.add(provinceName);
                province.classList.add('visited');
            }
            updateVisitedProvincesList();
        });
    });

    function updateVisitedProvincesList() {
        visitedProvincesList.innerHTML = '';
        visitedProvinces.forEach(province => {
            const li = document.createElement('li');
            li.textContent = province;
            visitedProvincesList.appendChild(li);
        });
    }
});