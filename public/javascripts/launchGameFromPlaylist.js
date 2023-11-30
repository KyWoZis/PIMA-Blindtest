function getOptions(option){
    const options1 = document.getElementById('music_name');
    const options2 = document.getElementById('artist');
    const options3 = document.getElementById('music_type');
    const options4 = document.getElementById('origin');
    option.value = option1.value * 8 + option2.value * 4 + option3.value * 2 + option4.value;
}

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
                        if(key === 'user_id' || key === 'playlist_id') return;
                        const cell = document.createElement('td');
                        cell.textContent = result[key];
                        row.appendChild(cell);
                    });

                    // Create a cell for the "Launch" button
                    const launchCell = document.createElement('td');
                    const launchForm = document.createElement('form');
                    launchForm.action = '';
                    launchForm.method = 'get';

                    const launchInputUserId = document.createElement('input');
                    launchInputUserId.type = 'hidden';
                    launchInputUserId.name = 'user_id';
                    launchInputUserId.value = result.user_id;
                    const launchInputPlaylistId = document.createElement('input');
                    launchInputPlaylistId.type = 'hidden';
                    launchInputPlaylistId.name = 'playlist_id';
                    launchInputPlaylistId.value = result.playlist_id;
                    const launchOption = document.createElement('input');
                    launchOption.type = 'hidden';
                    launchOption.name = 'options';
                    launchOption.value = 10;
                    const launchButton = document.createElement('button');
                    //launchButton.onclick = function() { change options value but doesn't work
                    //    getOptions(launchOption);
                    //}
                    launchButton.type = 'submit';
                    launchButton.textContent = 'Launch';
                    launchButton.id = 'launchButton';

                    launchForm.appendChild(launchInputUserId);
                    launchForm.appendChild(launchInputPlaylistId);
                    //launchForm.appendChild(launchOption);
                    launchForm.appendChild(launchButton);
                    launchCell.appendChild(launchForm);

                    row.appendChild(launchCell);
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