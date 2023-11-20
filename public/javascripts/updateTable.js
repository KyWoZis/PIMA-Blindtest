function updateTable(param, db, page, updatePageNumber = true) {
    const tableBody = document.getElementById('tableBody');

    //Get data from db json where a a value contains param
    const data = db.filter(item => {
        return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(param.toLowerCase());
        });
    });
    
    tableBody.innerHTML = ''; // Clear the existing table body content
    var i = 1;
    var BreakException = {};
    try {
        data.forEach(result => {
            if (i > (page-1)*100) {
                // Create a new row for each search result
                const row = document.createElement('tr');
                // Create table cells for each data field
                Object.keys(result).forEach(key => {
                const cell = document.createElement('td');
                cell.textContent = result[key];
                row.appendChild(cell);
                });
                // Create a cell for the "Delete" button
                const deleteCell = document.createElement('td');
                const deleteForm = document.createElement('form');
                deleteForm.action = 'delete';
                deleteForm.method = 'get';
                const deleteInput = document.createElement('input');
                deleteInput.type = 'hidden';
                deleteInput.name = 'id';
                deleteInput.value = result.music_id;
                const deleteButton = document.createElement('button');
                deleteButton.type = 'submit';
                deleteButton.textContent = 'Delete';
                deleteButton.id = 'deleteButton';
                deleteForm.appendChild(deleteInput);
                deleteForm.appendChild(deleteButton);
                deleteCell.appendChild(deleteForm);
                row.appendChild(deleteCell);
                // Add the row to the table body
                tableBody.appendChild(row);
                if (i == page*100) {
                    throw BreakException;
                }
            }
            i++;
            });
        } catch (error) {
        //leaving foreach if BreakException
        if (error !== BreakException) throw error;
        const nbPages = Math.ceil(data.length/100);
        //update the select pageNumber adding options for the number of pages
        if (updatePageNumber) {
            const selectPage = document.getElementById('pageNumber');
            const selectedPageElement = document.getElementById('selectedPage');
            selectPage.innerHTML = '';
            for (let j = 1; j <= nbPages; j++) {
                const option = document.createElement('option');
                option.value = j;
                option.textContent = j;
                selectPage.appendChild(option);
            }
            currentPage = 1;
            selectedPageElement.innerText = 'Selected Page: 1';
            selectPage.value = currentPage;
        }
    }
};