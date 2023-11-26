function updateTable(param, db, page, updatePageNumber = true) {
    const tableBody = document.getElementById('tableBody');

    //Get data from db json where a a value contains param
    const data = db.filter(item => {
        return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(param.toLowerCase());
        });
    });
    
    tableBody.innerHTML = ''; // Clear the existing table body content
    if (data.length == 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.textContent = "No data found"
        row.appendChild(cell);
        tableBody.appendChild(row);
    }
    else {
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
                    const editButton = document.createElement('button');
                    editButton.type = 'button';
                    editButton.textContent = 'Edit';
                    editButton.id = 'editButton';
                    deleteForm.appendChild(deleteInput);
                    deleteForm.appendChild(deleteButton);
                    deleteCell.appendChild(deleteForm);
                    deleteCell.appendChild(editButton);
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
            }
    }
    //update the select pageNumber adding options for the number of pages
    if (updatePageNumber) {
        const nbPages = Math.ceil(data.length/100);
        const selectPage = document.getElementById('pageNumber');
        const selectedPageElement = document.getElementById('selectedPage');
        var prevPageButton = document.getElementById('prevPage');
        var nextPageButton = document.getElementById('nextPage');
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
        prevPageButton.disabled = true;
        nextPageButton.disabled = nbPages<=1;
    }
};